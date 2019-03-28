import { Module } from '@nestjs/common';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ArtworksController],
  providers: [ArtworksService],
  imports: [AuthModule],
})
export class ArtworksModule {}
