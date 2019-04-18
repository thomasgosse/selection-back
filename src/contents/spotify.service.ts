import { AuthService } from '../auth/auth.service';
import { Injectable, HttpService } from '@nestjs/common';
import { ContentsProviderInterface } from './contents-provider.interface';

@Injectable()
export class SpotifyService implements ContentsProviderInterface {

  private token: string;

  constructor(private readonly authService: AuthService, private readonly httpService: HttpService) {}

  private getConfig(token: string) {
    return {
      headers: {
        Authorization: 'Bearer '.concat(token),
      },
    };
  }

  private async retryCall(error: any) {
    return new Promise(async (resolve, reject) => {
      if (error.response.status === 401) {
        this.token = await this.authService.getSpotifyToken();
        error.config.headers.Authorization = 'Bearer '.concat(this.token);
        this.httpService.axiosRef(error.config)
          .then(result => resolve(result.data))
          .catch(e => reject(e));
      } else {
        reject(error);
      }
    });
  }

  private async getSpotifyArtistAlbums(id: string) {
    const url = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single`;
    const config = this.getConfig(this.token);
    return this.httpService.axiosRef.get(url, config)
      .then(result => result.data);
  }

  async getArtistAlbums(id: string) {
    try {
      return await this.getSpotifyArtistAlbums(id);
    } catch (error) {
      return this.retryCall(error);
    }
  }

  private async getSpotifySearchResult(query: string) {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist,album`;
    const config = this.getConfig(this.token);
    return this.httpService.axiosRef.get(url, config)
      .then(result => result.data);
  }

  async getSearchResult(query: string) {
    try {
      return await this.getSpotifySearchResult(query);
    } catch (error) {
      return this.retryCall(error);
    }
  }
}
