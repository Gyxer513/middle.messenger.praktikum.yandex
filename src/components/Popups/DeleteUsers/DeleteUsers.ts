import Block from '@core/Block.ts';
import { TUserData } from '@core/api/services/user.ts';
import { template } from './deleteUsers.template';
import { withStore } from '@core/Store/withStore.ts';
import { Button } from '@/components';

interface IDeleteUsersProps {
  currentUsers?: TUserData[];
}

class DeleteUsers extends Block {
  constructor(props: IDeleteUsersProps) {
    super({...props, deleteButton: new Button({
        id: 'deleteButton',
        class_name: 'button button__main',
        text: 'Удалить пользователей',
        type: 'button',
        onClick: (e: Event) => {
          e.preventDefault();
        },
      })});
  }
  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

const withCurrentUsersStore = withStore(state => ({
  currentUsers: state.currentUsers
}));

export const DeleteUsersWithStore = withCurrentUsersStore(DeleteUsers)