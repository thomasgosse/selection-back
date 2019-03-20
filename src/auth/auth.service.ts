import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  async validateUser(token: string): Promise<any> {
    return Promise.resolve(true);
  }
}
