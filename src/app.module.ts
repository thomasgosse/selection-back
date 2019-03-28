import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtworksModule } from './artworks/artworks.module';

@Module({
  imports: [UsersModule, AuthModule, ArtworksModule],
})
export class AppModule {}
