import { Artwork } from '../types/artwork.type';

export interface DatabaseInterface {
  getArtworksByType(userId: string, type: string, limit: string, startAfter?: string): Promise<Artwork[]>;
  setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<Artwork | {message: string}>;
  deleteArtwork(userId: string, artworkId: string, type: string): Promise<any>;
  getArtworksCount(userId: string, type: string): Promise<{ artworkCount: number }>;
}
