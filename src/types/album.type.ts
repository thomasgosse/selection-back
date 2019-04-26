import { Artwork } from './artwork.type';
import { Artist } from './artist.type';

export interface Album extends Artwork {
  readonly artists: Artist[];
  readonly album_type: string;
}
