import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, UseGuards, Query, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { Artwork } from '../types/artwork.type';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
@UseGuards(AuthGuard('bearer'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/:artworkType')
  getArtworksByType(
    @Param('userId') userId: string,
    @Param('artworkType') type: string,
    @Query('limit') limit: string,
    @Query('startAfter') startAfter: string,
    @Res() res,
  ) {
    this.usersService.getArtworksByType(userId, type, startAfter, limit)
      .then(result => res.send(result))
      .catch((e) => {
        Logger.error(`[UsersController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }

  @Post(':userId/:artworkType/:artworkId')
  setArtwork(
    @Body() artwork: Artwork,
    @Param('userId') userId: string,
    @Param('artworkId') artworkId: string,
    @Param('artworkType') type: string,
    @Res() res,
  ) {
    this.usersService.setArtwork(artwork, userId, artworkId, type)
      .then((result) => {
        const itExists = ('message' in result) && result.message.includes('artwork.already.exists');
        if (itExists) res.status(HttpStatus.OK).send(result);
        else res.status(HttpStatus.CREATED).send(result);
      })
      .catch((e) => {
        Logger.error(`[UsersController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }

  @Delete(':userId/:artworkType/:artworkId')
  deleteArtwork(
    @Param('userId') userId: string,
    @Param('artworkId') artworkId: string,
    @Param('artworkType') type: string,
    @Res() res,
  ) {
    this.usersService.deleteArtwork(userId, artworkId, type)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((e) => {
        Logger.error(`[UsersController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }

  @Get(':userId/:artworkType/count')
  getArtworksCount(
    @Param('userId') userId: string,
    @Param('artworkType') type: string,
    @Res() res,
  ) {
    this.usersService.getArtworksCount(userId, type)
      .then(result => res.send(result))
      .catch((e) => {
        Logger.error(`[UsersController] ${e.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
  }
}
