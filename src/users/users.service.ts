import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Album } from './types/album.type';

@Injectable()
export class UsersService {

  constructor(private readonly firebaseService: FirebaseService) {}

  doNothing(): string {
    return 'Doing nothing bro!';
  }

  setAlbum(album: Album, userId: string, artworkId: string): string {
    this.firebaseService.setAlbum(album, userId, artworkId);
    return 'added';
  }

  deleteAlbum(userId: string, artworkId: string): string {
    return 'deleted';
  }
}
