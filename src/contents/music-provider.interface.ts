import { SearchItem } from 'src/types/search-item.type';
import { Album } from 'src/types/album.type';
import { AlbumDetail } from 'src/types/album-detail.type';

export interface MusicProviderInterface {
  getSearchResult(query: string): Promise<{ artists: SearchItem[], albums: SearchItem[] }>;
  getArtistAlbums(id: string): Promise<Album[]>;
  getAlbumDetail(id: string): Promise<AlbumDetail>;
}
