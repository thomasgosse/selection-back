import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Artwork } from './types/artwork.type';

@Injectable()
export class UsersService {

  constructor(private readonly firebaseService: FirebaseService) {}

  getArtworksByType(userId: string, type: string): Promise<any> {
    return this.firebaseService.getArtworksByType(userId, type)
      .then((artworks) => {
        return artworks.docs.map(artwork => artwork.data());
      });
  }

  setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<any> {
    return this.firebaseService.setArtwork(artwork, userId, artworkId, type);
  }

  deleteArtwork(userId: string, artworkId: string, type: string): Promise<any> {
    return this.firebaseService.deleteArtwork(userId, artworkId, type);
  }
}
