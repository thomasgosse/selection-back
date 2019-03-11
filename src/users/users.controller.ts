import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Album } from './types/album.type';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return this.usersService.doNothing();
  }

  @Get(':userId')
  getUser(): string {
    return this.usersService.doNothing();
  }

  @Get(':userId/artworks')
  getArtworks(): string {
    return this.usersService.doNothing();
  }

  @Post(':userId/artworks/:artworkId')
  setArtwork(
    @Body() album: Album,
    @Param('userId') userId,
    @Param('artworkId') artworkId,
    @Res() res,
  ) {
    this.usersService.setAlbum(album, userId, artworkId);
    res.status(HttpStatus.CREATED).send();
  }

  @Delete(':userId/artworks/:artworkId')
  deleteArtwork(
    @Param('userId') userId,
    @Param('artworkId') artworkId,
  ): string {
    return this.usersService.deleteAlbum(userId, artworkId);
  }
}
