import { Artist } from './artist.type';
import { Artwork } from './artwork.type';
export class Album extends Artwork {
  readonly artists: Artist[];
}
