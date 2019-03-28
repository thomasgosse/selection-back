import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService],
  imports: [AuthModule],
})
export class ContentsModule {}
