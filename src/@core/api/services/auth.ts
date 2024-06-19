// import store from '@core/Store/Store.ts'
import { router } from '@/index.ts';
import { AuthController } from '@core/api/controllers';
export type TSignUpData = {
  first_name?: string;
  second_name?: string;
  login?: string;
  email?: string;
  password?: string;
  phone?: string;
};

class Auth {
  public async createUser(data: TSignUpData) {
    try {
      await AuthController.signUp(data);
      router.setAuthenticationStatus(true);
      router.navigateTo('/chats');
    } catch (error) {
      console.warn('Произошла ошибка' + error);
    }
  }

  public async login(data: Pick<TSignUpData, 'login' | 'password'>) {
    try {
      await AuthController.signIn(data);
      router.setAuthenticationStatus(true);
      router.navigateTo('/chats');
    } catch (error) {
      console.warn('Произошла ошибка' + error);
    }
  }
}

export const AuthService = new Auth();
