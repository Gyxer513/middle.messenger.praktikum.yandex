import Block from '@core/Block.ts';
import { TUserData } from '@core/api/services/user.ts';
import { withStore } from '@core/Store/withStore.ts';
import { template } from './userList.template.ts';
import './userList.scss';

type TUserListProps = {
  users?: Array<TUserData>;
  onClick: (event: MouseEvent) => void;
  handleData?: boolean;
  text: string;
};

export class UsersList extends Block {
    constructor(props: TUserListProps) {
        super({
            ...props,
            handleData: props.users?.length !== 0,
            events: {
                click: props.onClick,
            },
        });
    }

    render(): HTMLElement {
        return this.compile(template, { ...this.props });
    }
}

const withSearchedUsersStore = withStore((state) => ({
    users: state.searchedUsers,
}));

export const UsersListWithSearchedUsers = withSearchedUsersStore(UsersList);
