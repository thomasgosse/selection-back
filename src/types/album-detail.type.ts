import { Artwork } from './artwork.type';
import { Track } from './track.type';
import { Artist } from './artist.type';

export interface AlbumDetail extends Artwork {
  readonly tracks: Track[];
  readonly artists: Artist[];
  readonly label: string;
}
