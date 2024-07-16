import store from '@core/Store/Store.ts'
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
        const userData = await AuthController.getUserInfo();
        store.setState('userData',  userData)
        router.navigateTo('/chats');
    } catch (error) {
      router.setAuthenticationStatus(false)
      console.warn('Произошла ошибка' + error);
    }
  }

  public async logout() {
    try {
      await AuthController.logout();
      router.setAuthenticationStatus(false)
      router.navigateTo('/login');
    } catch (error) {
      console.warn('Произошла ошибка' + error);
    }
  }

  public async fetchUser() {
    try {
      console.log(router.getAuthenticatedStatus())
      router.setAuthenticationStatus(true);
      const userData = await this.getUserInfo()
      store.setState('userData',  userData)
      console.log(router.getAuthenticatedStatus())
    } catch (error) {
      router.setAuthenticationStatus(false)
      console.warn('Произошла ошибка ошибка авторизации');
    }
  }

  private async getUserInfo() {
    return await AuthController.getUserInfo();

  }
}
export const AuthService = new Auth();
