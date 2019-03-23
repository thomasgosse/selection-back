import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {

  async validateUser(token: string): Promise<any> {
    return admin.auth().verifyIdToken(token).catch(() => { throw new UnauthorizedException(); });
  }
}
