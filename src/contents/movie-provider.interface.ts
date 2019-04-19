import { SearchItem } from 'src/types/search-item.type';

export interface MovieProviderInterface {
  getSearchResult(query: string): Promise<{tvshows: SearchItem[], movies: SearchItem[]}>;
  getMovieDetail?(id: string);
}
