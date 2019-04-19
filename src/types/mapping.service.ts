import { Injectable } from '@nestjs/common';
import { SearchItem } from './search-item.type';
import { Album } from './album.type';

@Injectable()
export class MappingService {

  private tmdbImageUrl: string = 'https://image.tmdb.org/t/p/';

  mapSearchItems(items: any[], type: string, typeLabel: string): SearchItem[] {
    return items.map(item => ({
      type,
      typeLabel,
      id: item.id,
      name: item.name,
      ...(item.images && { images: item.images }),
      ...(item.poster_path && { images: [{ url: `${this.tmdbImageUrl}w154${item.poster_path}` , height: 154, width: 154 }] }),
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

  mapAlbums(items: any[]): Album[] {
    return items.map(item => ({
      album_type: item.album_type,
      artists: item.artists,
      id: item.id,
      name: item.name,
      releaseDate: item.release_date,
      type: item.type,
      images: item.images,
    }));
  }
}
