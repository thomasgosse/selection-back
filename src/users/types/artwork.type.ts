import { Image } from './image.type';

export class Artwork {
  readonly name: string;
  readonly type: string;
  readonly image: Image[];
  readonly releaseDate: string;
  readonly id: string;
}
