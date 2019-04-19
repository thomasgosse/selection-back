import { Artwork } from '../types/artwork.type';
import { Message } from 'src/types/message.type';

export interface DatabaseInterface {
  getArtworksByType(userId: string, type: string): Promise<Artwork[]>;
  setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<Artwork | Message>;
  deleteArtwork(userId: string, artworkId: string, type: string): Promise<any>;
}
