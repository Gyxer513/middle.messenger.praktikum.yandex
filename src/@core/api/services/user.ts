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
  public async updateUserData(): Promise<void> {

  }
}
