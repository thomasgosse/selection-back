import { Controller, Get, Res, Query, UseGuards, HttpStatus, Param } from '@nestjs/common';
import { ArtworksService } from './artworks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/contents')
@UseGuards(AuthGuard('bearer'))
export class ArtworksController {
  constructor(private readonly artworksService: ArtworksService) {}

  @Get('search')
  getSearchResults(
    @Query() params,
    @Res() res,
  ) {
    const searchQuery = params['query'];
    this.artworksService.getSearchResult(searchQuery)
      .then(result => res.send(result))
      .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send());
  }

  @Get('artists/:artistId/albums')
  getArtistAlbums(
    @Param('artistId') artistId: string,
    @Res() res,
  ) {
    this.artworksService.getArtistAlbums(artistId)
      .then(result => res.send(result))
      .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send());
  }
}
