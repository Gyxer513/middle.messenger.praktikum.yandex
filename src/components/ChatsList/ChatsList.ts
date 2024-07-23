import Block from '@core/Block.ts';

import { template } from './chatsList.template.ts';
import './chatList.scss';
import { withStore } from '@core/Store/withStore.ts';

interface IChatItemProps {
  avatar: string;
  alt: string;
  name: string;
  message: string;
  time: string;
  counter_class: string;
  counter_number: number;
}

type TChatsListProps = {items: Array<IChatItemProps>}

export class ChatsList extends Block {
  constructor(props: TChatsListProps) {
    super({
      ...props
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export const withChatsStore = withStore(state => ({
  items: state.chats
}));

export const ChatsListWithStore = withChatsStore(ChatsList);