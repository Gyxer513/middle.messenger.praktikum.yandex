import Block from '@core/Block.ts';
import { template } from './deleteUsers.template';
import { withStore } from '@core/Store/withStore.ts';
import { UsersList } from '@/components';
import { TUserData } from '@core/api/services/user.ts';
import store from '@core/Store/Store.ts';
import { ChatsService } from '@core/api/services';

interface IDeleteUsersProps {
  currentUsers: Array<TUserData>;
}

class DeleteUsers extends Block {
  constructor(props: IDeleteUsersProps) {
    super({
      ...props,
      currentUsersList: new UsersList({
        users: props.currentUsers,
        onClick: (e: Event) => {
          e.preventDefault();
          const element = e.target as HTMLElement | null;
          if (element && element.id) {
            const chatId = store.getState().currentChatId;
            const id = +element.id;
            return this._deleteUser(chatId, id);
          }
        }
      })
    });
  }

  private async _deleteUser(chatId: number, userId: number): Promise<void> {
    await ChatsService.deleteUser(chatId, userId);
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

const withCurrentUsersStore = withStore(state => ({
  currentUsers: state.currentUsers
}));

export const DeleteUsersWithStore = withCurrentUsersStore(DeleteUsers);
