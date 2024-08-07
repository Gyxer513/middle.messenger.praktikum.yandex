import Block from '@core/Block.ts';
import { TUserData } from '@core/api/services/user.ts';
import { template } from './userList.template.ts';
import './userList.scss';

type TUserListProps = {
  users: Array<TUserData>;
  onClick: (e: Event) => void;
};

export class UsersList extends Block {
  constructor(props:TUserListProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
