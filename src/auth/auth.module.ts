import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';

@Module({
  imports: [HttpModule],
  providers: [AuthService, HttpStrategy],
  exports: [AuthService],
})
export class AuthModule {}
