import { Injectable, HttpService } from '@nestjs/common';
import { ContentsProviderInterface } from './contents-provider.interface';
const tmdbSecrets = require('./tmdbSecrets.json');

@Injectable()
export class TmdbService implements ContentsProviderInterface {

  private apiKey: string = tmdbSecrets.apiKey;

  constructor(private readonly httpService: HttpService) {}

  getSearchResult(query: string) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&query=${query}`;
    return this.httpService.axiosRef.get(url);
  }

  getMovieDetail(id: string) {
    return 'to.implement';
  }
}
