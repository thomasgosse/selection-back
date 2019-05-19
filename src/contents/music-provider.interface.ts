import { SearchItem } from '../types/search-item.type';
import { Album } from '../types/album.type';
import { AlbumDetail } from '../types/album-detail.type';

export interface MusicProviderInterface {
  getSearchResult(query: string): Promise<{ artists: SearchItem[], albums: SearchItem[] }>;
  getArtistAlbums(id: string): Promise<Album[]>;
  getAlbumDetail(id: string): Promise<AlbumDetail>;
}
