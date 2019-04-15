import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Injectable()
export class ContentsService {

  constructor(private readonly musicService: SpotifyService) {}

  async getSearchResult(query: string): Promise<any> {
    return this.musicService.getSearchResult(query);
  }

  async getArtistAlbums(id: string): Promise<any>  {
    return this.musicService.getArtistAlbums(id);
  }
}
