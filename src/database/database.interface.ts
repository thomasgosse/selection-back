import { Artwork } from '../users/types/artwork.type';

export interface DatabaseInterface {
  getArtworksByType(userId: string, type: string);
  setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<any>;
  deleteArtwork(userId: string, artworkId: string, type: string): Promise<any>;
}
