import { Artwork } from './artwork.type';

interface Artist {
  readonly name: string;
  readonly id: string;
}
export interface Album extends Artwork {
  readonly artists: Artist[];
  readonly album_type: string;
}
