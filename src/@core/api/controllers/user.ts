import BaseQuery from '@core/HttpQuery.ts';
import { TUserData } from '@core/api/services/user.ts';


export class User extends BaseQuery  {
  constructor() {
    super('/user');
  }
  public changeData(data: TUserData) {
    return this.http.put('/profile', { data })
  }
  public updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data })
  }
}

export const UserController = new User();