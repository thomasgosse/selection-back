import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { SpotifyService } from './spotify.service';
import { AuthModule } from 'src/auth/auth.module';
import { ContentsService } from './contents.service';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService, SpotifyService],
  imports: [AuthModule],
})
export class ContentsModule {}
