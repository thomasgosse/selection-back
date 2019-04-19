import { Image } from './image.type';

export interface SearchItem {
  readonly name: string;
  readonly type: string;
  readonly typeLabel: string;
  readonly images: Image[];
  readonly id: string;
}
