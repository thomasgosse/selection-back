import { Artwork } from './artwork.type';
import { Season } from './season.type';

export interface TVShowDetail extends Artwork {
  readonly seasons: Season[];
  readonly inProduction: boolean;
  readonly overview: string;
}
