import Block from '@core/Block.ts';
import { UserListWithStore } from '@/components';
import { template } from './addUser.template.ts';
import store from '@core/Store/Store.ts';
import { UserService } from '@core/api/services/user.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { router } from '@/index.ts';
import { ChatsService } from '@core/api/services';

const formValidator = new FormValidator();

export class AddUser extends Block {
  constructor() {
    super({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const data = formValidator.handleSubmit('searchForm');
          const queryData = data.formData as { message: string };
          if (data.isValid) {
          return  this._findAndAddUser(queryData.message);
          }
        }
      },
      usersList: new UserListWithStore({
        text: 'Введите логин пользователя для добавления его в чат',
        type: 'Добавить',
        onClick: (e: Event) => {
          e.preventDefault();
          const element = e.target as HTMLElement | null;
          console.log(element)
          if (element && element.id) {
            const chatId = store.getState().currentChatId;
            const id = +element.id as number;
            return this._addUser(chatId, id);
          }
        }
      })
    });
  }

  private async _addUser(chatId: number, userId: number) {
    await ChatsService.addUser(chatId, userId);
  }

  private async _findAndAddUser(userName: string): Promise<void> {
    await UserService.searchUser(userName);
    router.renderPopup(new AddUser())
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
