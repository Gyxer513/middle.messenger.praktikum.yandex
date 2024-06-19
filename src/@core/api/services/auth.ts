import store from '@core/Store/Store.ts'
import router from  '@core/Router.ts'
import { AuthController } from '@core/api/controllers';
export type TSignUpData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
};


class Auth {

  public async createUser(data: TSignUpData) {
    try {
      await AuthController.signUp(data);
    } catch (error) {
      console.warn(error.message)
    }
  }

  public async login(data: Pick<TSignUpData, 'login' | 'password'>) {
    try {
      await AuthController.signUp(data);
    } catch (error) {
      console.warn(error.message);
    }
  }
}

export const AuthService = new Auth();