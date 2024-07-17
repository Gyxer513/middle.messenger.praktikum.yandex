import { TPasswordData, UserController } from '@core/api/controllers/user.ts';
import { router } from '@/index.ts';

export type TUserData = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
  avatar: string;
} | {};

export class User {

  public async updateUserData(data: TUserData): Promise<void> {
    try {
      await UserController.changeData(data)
      router.navigateTo('/chats')
    } catch (error) {
      console.warn(error)
    }
  }
  public async changeAvatar(file: File): Promise<void> {
    try {
      const data = new FormData();
      data.append('avatar', file);
      return UserController.updateAvatar(data)
    } catch (error) {
      console.warn(error)
    }
  }

  public async changePass(data: TPasswordData): Promise<void> {
    try {
      await UserController.changePass(data)
    } catch (error) {
      console.warn('Произошла ошибка', error)
    }
  }
}

export const UserService = new User();