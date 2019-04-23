import { Image } from './image.type';

export interface Season {
  readonly episodeCount: number;
  readonly name: string;
  readonly seasonNumber: number;
  readonly images: Image[];
  readonly overview: string;
}
