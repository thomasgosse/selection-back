import { Injectable } from '@nestjs/common';
import { Artwork } from './artwork.type';

@Injectable()
export class MappingService {

  private tmdbImageUrl: string = 'https://image.tmdb.org/t/p/';

  mapSearchItems(items: any[], type: string, typeLabel: string) {
    return items.map(item => ({
      type,
      typeLabel,
      ...item,
      ...(item.poster_path && { images: [{ url: `${this.tmdbImageUrl}w154${item.poster_path}` , height: 154, width: 154 }] }),
    }));
  }
}
