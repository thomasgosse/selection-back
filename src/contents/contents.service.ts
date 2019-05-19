import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { TmdbService } from './tmdb.service';
import { SearchItem } from '../types/search-item.type';
import { Album } from '../types/album.type';
import { TVShowDetail } from '../types/tvshow-detail.type';
import { AlbumDetail } from '../types/album-detail.type';

type SearchResult = {tvshows: SearchItem[], movies: SearchItem[], artists: SearchItem[], albums: SearchItem[]; };
@Injectable()
export class ContentsService {

  constructor(
    private readonly musicService: SpotifyService,
    private readonly movieService: TmdbService) {}

  async getSearchResult(query: string): Promise<SearchResult> {
    const movieSearchResult = await this.movieService.getSearchResult(query);
    const musicSearchResult = await this.musicService.getSearchResult(query);
    return {
      tvshows: movieSearchResult.tvshows,
      movies: movieSearchResult.movies,
      artists: musicSearchResult.artists,
      albums: musicSearchResult.albums,
    };
  }

  async getArtistAlbums(id: string): Promise<Album[]> {
    return this.musicService.getArtistAlbums(id);
  }

  async getTVShowDetail(id: string): Promise<TVShowDetail> {
    return this.movieService.getTVShowDetail(id);
  }

  async getAlbumDetail(id: string): Promise<AlbumDetail> {
    return this.musicService.getAlbumDetail(id);
  }
}
