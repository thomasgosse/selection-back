import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Artwork } from '../users/types/artwork.type';
import { DocumentReference, Firestore } from '@google-cloud/firestore';
const serviceAccount = require('./serviceAccountKey.json');

@Injectable()
export class FirebaseService {

  private firestore: Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://selection-5744a.firebaseio.com',
    });
    this.firestore = admin.firestore();
  }

  private async checkExistence(documentRef: DocumentReference): Promise<boolean> {
    const document = await documentRef.get();
    return document.exists;
  }

  async getArtworksByType(userId: string, type: string) {
    const artworskRef = this.firestore.collection('users').doc(userId).collection(type);
    return artworskRef.get();
  }

  async setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<any> {
    const artworkRef = this.firestore.collection('users').doc(userId).collection(type).doc(artworkId);
    const artworkExists = await this.checkExistence(artworkRef);
    if (artworkExists) {
      return { message: 'artwork.already.exists' };
    }
    artworkRef.set(artwork);
    return artwork;
  }

  async deleteArtwork(userId: string, artworkId: string, type: string): Promise<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection(type)
      .doc(artworkId)
      .delete();
  }
}
