import { Injectable, HttpService } from '@nestjs/common';
import { MovieProviderInterface } from './movie-provider.interface';
import { MappingService } from '../types/mapping.service';
import { SearchItem } from '../types/search-item.type';
import { TVShowDetail } from '../types/tvshow-detail.type';

@Injectable()
export class TmdbService implements MovieProviderInterface {

  private apiKey: string = process.env.TMDB_API_KEY as string;

  constructor(private readonly httpService: HttpService, private readonly mappingService: MappingService) {}

  async getSearchResult(query: string): Promise<{tvshows: SearchItem[], movies: SearchItem[]}> {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&query=${query}`;
    const tmdbSearchResult = await this.httpService.axiosRef.get(url);
    return this.mappingService.mapTmdbSearchItems(tmdbSearchResult.data.results);
  }

  async getTVShowDetail(id: string): Promise<TVShowDetail> {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=fr`;
    const tvShowDetail = await this.httpService.axiosRef.get(url);
    return this.mappingService.mapTVShowDetail(tvShowDetail.data);
  }
}
