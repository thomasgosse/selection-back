import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { SpotifyService } from './spotify.service';
import { AuthModule } from '../auth/auth.module';
import { ContentsService } from './contents.service';
import { TmdbService } from './tmdb.service';
import { MappingService } from '../types/mapping.service';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService, SpotifyService, TmdbService, MappingService],
  imports: [AuthModule],
})
export class ContentsModule {}
