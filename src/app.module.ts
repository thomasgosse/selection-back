import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContentsModule } from './contents/contents.module';

@Module({
  imports: [UsersModule, AuthModule, ContentsModule],
})
export class AppModule {}
