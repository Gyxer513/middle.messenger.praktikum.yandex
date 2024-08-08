import BaseQuery from '@core/HttpQuery.ts';

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

  public searchUser(data: TSearch) {
    return this.http.post('/search', { data });
  }
}

export const UserController = new User();
