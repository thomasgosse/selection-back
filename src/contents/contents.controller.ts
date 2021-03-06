import { Controller, Get, Res, Query, UseGuards, HttpStatus, Param, Logger } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/contents')
@UseGuards(AuthGuard('bearer'))
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get('search')
  getSearchResults(
    @Query() params,
    @Res() res,
  ) {
    const searchQuery = params['query'];
    this.contentsService.getSearchResult(searchQuery)
      .then(result => res.send(result))
      .catch((e) => {
        Logger.error(`[ContentsController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }

  @Get('artists/:artistId/albums')
  getArtistAlbums(
    @Param('artistId') artistId: string,
    @Res() res,
  ) {
    this.contentsService.getArtistAlbums(artistId)
      .then(result => res.send(result))
      .catch((e) => {
        Logger.error(`[ContentsController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }

  @Get('album/:albumId/')
  getAlbumDetail(
    @Param('albumId') albumId: string,
    @Res() res,
  ) {
    this.contentsService.getAlbumDetail(albumId)
      .then(result => res.send(result))
      .catch((e) => {
        Logger.error(`[ContentsController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }

  @Get('tvshow/:tvshowId/')
  getTVShowDetail(
    @Param('tvshowId') tvshowId: string,
    @Res() res,
  ) {
    this.contentsService.getTVShowDetail(tvshowId)
      .then(result => res.send(result))
      .catch((e) => {
        Logger.error(`[ContentsController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }
}
