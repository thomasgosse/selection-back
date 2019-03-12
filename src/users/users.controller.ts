import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Artwork } from './types/artwork.type';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/:artworkType')
  getArtworksByType(
    @Param('userId') userId,
    @Param('artworkType') type,
    @Res() res,
  ) {
    this.usersService.getArtworksByType(userId, type)
      .then(result => res.send(result))
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error));
  }

  @Post(':userId/:artworkType/:artworkId')
  setArtwork(
    @Body() artwork: Artwork,
    @Param('userId') userId,
    @Param('artworkId') artworkId,
    @Param('artworkType') type,
    @Res() res,
  ) {
    this.usersService.setArtwork(artwork, userId, artworkId, type)
      .then((result) => {
        if (!result) res.send(result);
        res.status(HttpStatus.CREATED).send(result);
      })
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error));
  }

  @Delete(':userId/:artworkType/:artworkId')
  deleteArtwork(
    @Param('userId') userId,
    @Param('artworkId') artworkId,
    @Param('artworkType') type,
    @Res() res,
  ) {
    this.usersService.deleteArtwork(userId, artworkId, type)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error));
  }
}
