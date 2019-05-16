import { AuthService } from '../auth/auth.service';
import { Injectable, HttpService } from '@nestjs/common';
import { MusicProviderInterface } from './music-provider.interface';
import { MappingService } from 'src/types/mapping.service';
import { SearchItem } from 'src/types/search-item.type';
import { AxiosRequestConfig } from 'axios';
import { Album } from 'src/types/album.type';
import { AlbumDetail } from 'src/types/album-detail.type';

@Injectable()
export class SpotifyService implements MusicProviderInterface {

  private token: string;

  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly mappingService: MappingService) {}

  private getConfig(token: string): AxiosRequestConfig {
    return {
      headers: {
        Authorization: 'Bearer '.concat(token),
      },
    };
  }

  private async retryCall(error: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (error.response && error.response.status === 401) {
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

  private async getSpotifyArtistAlbums(id: string): Promise<any> {
    const url = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`;
    const config = this.getConfig(this.token);
    return this.httpService.axiosRef.get(url, config)
      .then(result => result.data);
  }

  async getArtistAlbums(id: string): Promise<Album[]> {
    try {
      const spotifyArtistAlbums = await this.getSpotifyArtistAlbums(id);
      return this.mappingService.mapAlbums(spotifyArtistAlbums.items);
    } catch (error) {
      const spotifyArtistAlbums = await this.retryCall(error);
      return this.mappingService.mapAlbums(spotifyArtistAlbums.items);
    }
  }

  private async getSpotifySearchResult(query: string): Promise<any> {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist,album`;
    const config = this.getConfig(this.token);
    return this.httpService.axiosRef.get(url, config)
      .then(result => result.data);
  }

  async getSearchResult(query: string): Promise<{ artists: SearchItem[], albums: SearchItem[] }> {
    try {
      const spotifySearchResult = await this.getSpotifySearchResult(query);
      return this.mappingService.mapSpotifySearchItems(spotifySearchResult);
    } catch (error) {
      const spotifySearchResult = await this.retryCall(error);
      return this.mappingService.mapSpotifySearchItems(spotifySearchResult);
    }
  }

  private async getSpotifyAlbumDetail(id: string): Promise<any> {
    const url = `https://api.spotify.com/v1/albums/${id}`;
    const config = this.getConfig(this.token);
    return this.httpService.axiosRef.get(url, config)
      .then(result => result.data);
  }

  async getAlbumDetail(id: string): Promise<AlbumDetail> {
    try {
      const albumDetail = await this.getSpotifyAlbumDetail(id);
      return this.mappingService.mapAlbumDetail(albumDetail);
    } catch (error) {
      const albumDetail = await this.retryCall(error);
      return this.mappingService.mapAlbumDetail(albumDetail);
    }
  }
}
