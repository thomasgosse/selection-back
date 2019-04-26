import { Artist } from './artist.type';

export interface Track {
  readonly name: string;
  readonly durationMs: number;
  readonly trackNumber: number;
  readonly artists: Artist[];
}
