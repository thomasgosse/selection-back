import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { TmdbService } from './tmdb.service';
import { Album } from 'src/types/album.type';
import { MappingService } from 'src/types/mapping.service';

@Injectable()
export class ContentsService {

  constructor(
    private readonly musicService: SpotifyService,
    private readonly movieService: TmdbService,
    private readonly mappingService: MappingService) {}

  async getSearchResult(query: string) {
    const movieSearchResult = await this.movieService.getSearchResult(query);
    const musicSearchResult = await this.musicService.getSearchResult(query);
    return {
      artists: this.mappingService.mapSearchItems(musicSearchResult.artists.items, 'artist', 'Artist'),
      albums: this.mappingService.mapSearchItems(musicSearchResult.albums.items, 'album', 'Album'),
      tvshows: this.mappingService.mapSearchItems(movieSearchResult.data.results, 'tvshow' , 'TV Show'),
    };
  }

  async getArtistAlbums(id: string) {
    return this.musicService.getArtistAlbums(id);
  }
}
