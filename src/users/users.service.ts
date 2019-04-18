import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import { Artwork } from '../types/artwork.type';

@Injectable()
export class UsersService {

  constructor(private readonly databaseService: FirebaseService) {}

  getArtworksByType(userId: string, type: string) {
    return this.databaseService.getArtworksByType(userId, type)
      .then((artworks) => {
        return artworks.docs.map(artwork => artwork.data());
      });
  }

  setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<any> {
    return this.databaseService.setArtwork(artwork, userId, artworkId, type);
  }

  deleteArtwork(userId: string, artworkId: string, type: string) {
    return this.databaseService.deleteArtwork(userId, artworkId, type);
  }
}
