export interface ContentsProviderInterface {
  getSearchResult(query: string): Promise<any>;
  getArtistAlbums?(id: string): Promise<any>;
}
