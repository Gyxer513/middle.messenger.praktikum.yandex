import BaseQuery from '@core/HttpQuery.ts';
import { TUserData } from '@core/api/services/user.ts';


export class User extends BaseQuery  {
  constructor() {
    super('/user');
  }
  changeData(data: TUserData) {
    return this.http.put('/profile', { data })
  }
}

export const UserController = new User();