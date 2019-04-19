import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import { Artwork } from '../types/artwork.type';

@Injectable()
export class UsersService {

  constructor(private readonly databaseService: FirebaseService) {}

  getArtworksByType(userId: string, type: string): Promise<Artwork[]> {
    return this.databaseService.getArtworksByType(userId, type);
  }

  setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<Artwork | {message: string}> {
    return this.databaseService.setArtwork(artwork, userId, artworkId, type);
  }

  deleteArtwork(userId: string, artworkId: string, type: string): Promise<any> {
    return this.databaseService.deleteArtwork(userId, artworkId, type);
  }
}
