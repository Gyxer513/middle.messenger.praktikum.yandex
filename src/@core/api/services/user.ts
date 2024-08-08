import { TPasswordData, UserController } from '@core/api/controllers/user.ts';
import { router } from '@/index.ts';
import store from '@core/Store/Store.ts';

export type TUserData = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
  avatar: string;
};

export class User {
  public async updateUserData(
    data: Record<string, string | number | string[]>
  ): Promise<void> {
    try {
      await UserController.changeData(data);
      router.navigateTo('/chats');
    } catch (error) {
      console.warn(error);
    }
  }
  public async changeAvatar(file: File) {
    try {
      const data = new FormData();
      data.append('avatar', file);
      return UserController.updateAvatar(data);
    } catch (error) {
      console.warn(error);
    }
  }

  public async changePass(data: TPasswordData): Promise<void> {
    try {
      await UserController.changePass(data);
    } catch (error) {
      console.warn('Произошла ошибка', error);
    }
  }

  public async searchUser(name: string) {
    try {
      const result = await UserController.searchUser({ login: name });
      store.setState('searchedUsers', result);
    } catch (error) {
      console.warn('Произошла ошибка при поиске пользователя', error);
    }
  }
}

export const UserService = new User();
