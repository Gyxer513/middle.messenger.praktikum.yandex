import BaseQuery from '@core/HttpQuery.ts';
import { TUserData } from '@core/api/services/user.ts';

export type TPasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type TSearch = {
  login: string;
};

export class User extends BaseQuery {
  constructor() {
    super('/user');
  }

  public changeData(data: Record<string, string | number | string[]>) {
    return this.http.put('/profile', { data });
  }

  public updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }

  public changePass(data: TPasswordData) {
    return this.http.put('/password', { data });
  }

  public searchUser(data: TSearch): Promise<Array<TUserData> | TUserData> {
    const result = this.http.post('/search', { data } );
    return result as Promise<Array<TUserData> | TUserData>;
  }
}

export const UserController = new User();
