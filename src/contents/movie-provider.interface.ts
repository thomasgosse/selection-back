import { SearchItem } from 'src/types/search-item.type';
import { TVShowDetail } from 'src/types/tvshow-detail.type';

export interface MovieProviderInterface {
  getSearchResult(query: string): Promise<{ tvshows: SearchItem[], movies: SearchItem[] }>;
  getTVShowDetail(id: string): Promise<TVShowDetail>;
}
