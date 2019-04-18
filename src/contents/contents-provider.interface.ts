export interface ContentsProviderInterface {
  getSearchResult(query: string);
  getArtistAlbums?(id: string);
  getAlbumDetail?(id: string);
  getMovieDetail?(id: string);
}
