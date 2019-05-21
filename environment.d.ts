import * as ts from 'typescript'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SELECTION_BASIC: string;
      FIREBASE_PROJECT_ID: string,
      FIREBASE_PRIVATE_KEY: string,
      FIREBASE_CLIENT_EMAIL: string,
      TMDB_API_KEY: string
    }
  }
}