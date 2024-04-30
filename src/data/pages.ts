import * as Pages from '../parcials/pages/index.ts';

interface IPages {
  [key: string]: unknown[];
}

export const pages: IPages = {
  error404: [
    Pages.ErrorPage,
    {
      error_status: '404',
      text: 'Не туда попали'
    }
  ],
  error500: [
    Pages.ErrorPage,
    {
      error_status: '500',
      text: 'Мы уже фиксим'
    }
  ],
  login: [Pages.LoginPage],
  register: [Pages.RegisterPage],
  profile: [Pages.ProfilePage],
  changePass: [Pages.ChangePassPage],
  chats: [Pages.ChatsPage],
};
