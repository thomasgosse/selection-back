import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Artwork } from './types/artwork.type';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/:artworkType')
  @UseGuards(AuthGuard('bearer'))
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
        const itExists = result.message && result.message.includes('artwork.already.exists');
        if (itExists) res.status(HttpStatus.OK).send(result);
        else res.status(HttpStatus.CREATED).send(result);
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
