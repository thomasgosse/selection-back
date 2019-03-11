import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Album } from '../users/types/album.type';
const serviceAccount = require('./serviceAccountKey.json');

@Injectable()
export class FirebaseService {

  private firestore: FirebaseFirestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://selection-5744a.firebaseio.com',
    });
    this.firestore = admin.firestore();
  }

  setAlbum(album: Album, userId: string, artworkId: string): void {
    const userArtworks = this.firestore.collection('users').doc(userId).collection('artworks').doc(artworkId);
    userArtworks.set(album);
  }
}
