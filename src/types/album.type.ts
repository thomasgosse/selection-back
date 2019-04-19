import { Artwork } from './artwork.type';
export interface Album extends Artwork {
  readonly artists: Artist[];
  readonly album_type: string;
}

interface Artist {
  readonly name: string;
  readonly id: string;
}
