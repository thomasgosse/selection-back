import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Artwork } from '../types/artwork.type';
import { DocumentReference, Firestore } from '@google-cloud/firestore';
import { DatabaseInterface } from './database.interface';
const serviceAccount = require('./serviceAccountKey.json');

@Injectable()
export class FirebaseService implements DatabaseInterface {

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

  async getArtworksByType(userId: string, type: string): Promise<Artwork[]> {
    const artworskRef = this.firestore.collection('users').doc(userId).collection(type);
    const artworks = await artworskRef.get();
    return artworks.docs.map((artwork) => {
      const artworkData = artwork.data();
      const { name, type, images, releaseDate, id, timestamp, addedYear } = artworkData;
      return { name, type, images, releaseDate, id, timestamp, addedYear };
    });
  }

  async setArtwork(artwork: Artwork, userId: string, artworkId: string, type: string): Promise<Artwork | {message: string}> {
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
