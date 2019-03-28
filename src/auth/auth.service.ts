import { Injectable, UnauthorizedException, HttpService } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as querystring from 'querystring';

const authConfig = require('./authConfig.json');

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async validateUser(token: string): Promise<any> {
    return admin.auth().verifyIdToken(token)
      .then(decodedToken => (decodedToken.aud === authConfig.selectionId) ? true : false)
      .catch(() => { throw new UnauthorizedException(); });
  }

  getSpotifyToken(): Promise<any> {
    const requestBody = querystring.stringify({ grant_type: 'client_credentials' });
    const config = {
      headers: {
        Authorization: 'Basic '.concat(authConfig.selectionBasic),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return new Promise((resolve, reject) => {
      this.httpService.post('https://accounts.spotify.com/api/token', requestBody, config)
       .subscribe(
          (result) => {
            resolve(result.data.access_token);
          },
          (error) => {
            reject(error);
          });
    });
  }
}
