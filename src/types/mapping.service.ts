import { Injectable } from '@nestjs/common';
import { SearchItem } from './search-item.type';
import { Album } from './album.type';
import { TVShowDetail } from './tvshow-detail.type';
import { Season } from './season.type';
import { Image } from './image.type';

@Injectable()
export class MappingService {

  private tmdbImageUrl: string = 'https://image.tmdb.org/t/p/';

  private mapSearchItems(items: any[], type: string, typeLabel: string): SearchItem[] {
    return items.map(item => ({
      type,
      typeLabel,
      id: item.id,
      name: item.name,
      ...(item.images && { images: item.images }),
      ...(item.poster_path && this.mapTmdbImages(item.poster_path)),
    }));
  }

  mapSpotifySearchItems(spotifySearchResult: any): {artists: SearchItem[], albums: SearchItem[]} {
    return {
      artists: this.mapSearchItems(spotifySearchResult.artists.items, 'artist', 'Artist'),
      albums: this.mapSearchItems(spotifySearchResult.albums.items, 'album', 'Album'),
    };
  }

  mapTmdbSearchItems(tmdbSearchResult: any): {tvshows: SearchItem[], movies: SearchItem[]} {
    return {
      tvshows: this.mapSearchItems(tmdbSearchResult, 'tvshow', 'TV show'),
      movies: [],
    };
  }

  mapAlbums(albums: any[]): Album[] {
    return albums.map(album => ({
      album_type: album.album_type,
      artists: album.artists,
      id: album.id,
      name: album.name,
      releaseDate: album.release_date,
      type: album.type,
      images: album.images,
    }));
  }

  private mapTmdbImages(posterPath: string): {images: Image[]} {
    return  {
      images: [
        { url: `${this.tmdbImageUrl}w154${posterPath}` , height: 154, width: 154 },
        { url: `${this.tmdbImageUrl}w342${posterPath}` , height: 342, width: 342 },
        { url: `${this.tmdbImageUrl}w500${posterPath}` , height: 500, width: 500 },
      ],
    };
  }

  private mapSeasons(seasons: any[]): Season[] {
    return seasons.map(season => ({
      episodeCount: season.episode_count,
      name: season.name,
      overview: season.overview,
      seasonNumber: season.season_number,
      ...(season.poster_path && this.mapTmdbImages(season.poster_path)),
    }));
  }

  mapTVShowDetail(tvshow: any): TVShowDetail {
    return {
      id: tvshow.id,
      name: tvshow.name,
      releaseDate: tvshow.first_air_date,
      type: 'tvshow',
      ...(tvshow.poster_path && this.mapTmdbImages(tvshow.poster_path)),
      inProduction: tvshow.in_production,
      overview: tvshow.overview,
      ...(tvshow.seasons && { seasons: this.mapSeasons(tvshow.seasons) }),
    };
  }
}
