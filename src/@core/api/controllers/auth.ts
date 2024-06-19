import { TSignUpData } from '@core/api/services/auth.ts';
import  BaseQuery  from '@core/HttpQuery.ts';

export class Auth extends BaseQuery {
  constructor() {
    super('/auth');
  }

  signUp(data: TSignUpData) {
    return this.http.post('/signup', {data})
  }

  signIn(data: TSignUpData) {
    return this.http.post('/signin', {data})
  }
}

export const AuthController = new Auth();