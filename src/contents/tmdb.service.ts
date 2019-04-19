import { Injectable, HttpService } from '@nestjs/common';
import { MovieProviderInterface } from './movie-provider.interface';
import { MappingService } from 'src/types/mapping.service';
import { SearchItem } from 'src/types/search-item.type';
const tmdbSecrets = require('./tmdbSecrets.json');

@Injectable()
export class TmdbService implements MovieProviderInterface {

  private apiKey: string = tmdbSecrets.apiKey;

  constructor(private readonly httpService: HttpService, private readonly mappingService: MappingService) {}

  async getSearchResult(query: string): Promise<{tvshows: SearchItem[], movies: SearchItem[]}> {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&query=${query}`;
    const tmdbSearchResult = await this.httpService.axiosRef.get(url);
    return this.mappingService.mapTmdbSearchItems(tmdbSearchResult.data.results);
  }

  getMovieDetail(id: string) {
    return 'to.implement';
  }
}
