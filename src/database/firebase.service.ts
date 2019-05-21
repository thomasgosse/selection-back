import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Artwork } from '../types/artwork.type';
import { DocumentReference, Firestore } from '@google-cloud/firestore';
import { DatabaseInterface } from './database.interface';

@Injectable()
export class FirebaseService implements DatabaseInterface {

  private firestore: Firestore;

  constructor() {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    };
    console.log(serviceAccount);
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: 'https://selection-5744a.firebaseio.com',
    });
    this.firestore = firebase.firestore();
  }

  private async checkExistence(documentRef: DocumentReference): Promise<boolean> {
    const document = await documentRef.get();
    return document.exists;
  }

  private updateArtworksCount(value: number, userId: string, type: string): void {
    const statsRef = this.firestore.collection('users').doc(userId).collection(type).doc('--stats--');
    const increment = firebase.firestore.FieldValue.increment(value);
    statsRef.set({ artworkCount: increment }, { merge: true });
  }

  async getArtworksByType(userId: string, type: string, startAfter: string, limit: string): Promise<Artwork[]> {
    const artworskRef = this.firestore.collection('users').doc(userId).collection(type);
    const artworks = (startAfter)
    ? await artworskRef.orderBy('timestamp').startAfter(parseInt(startAfter, 10)).limit(parseInt(limit, 10)).get()
    : await artworskRef.orderBy('timestamp').limit(parseInt(limit, 10)).get();
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
    artworkRef
      .set(artwork)
      .then(() => this.updateArtworksCount(1, userId, type));
    return artwork;
  }

  async deleteArtwork(userId: string, artworkId: string, type: string): Promise<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection(type)
      .doc(artworkId)
      .delete()
      .then(() => this.updateArtworksCount(-1, userId, type));
  }

  async getArtworksCount(userId: string, type: string): Promise<{ artworkCount: number }> {
    const statsRef = this.firestore.collection('users').doc(userId).collection(type).doc('--stats--');
    return statsRef.get().then((stats) => {
      const statsData = stats.data();
      return statsData ? { artworkCount: statsData.artworkCount } : { artworkCount: -1 };
    });
  }
}
