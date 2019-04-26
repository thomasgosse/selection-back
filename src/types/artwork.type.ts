import { Image } from './image.type';

export interface Artwork {
  readonly name: string;
  readonly type: string;
  readonly images: Image[];
  readonly releaseDate: string;
  readonly id: string;
  // readonly timestamp?: number;
  // readonly addedYear?: string;
}
