import { template } from '@/pages/Chats/chats.template.ts';
import './chats.scss';
import Block from '@core/Block.ts';
import { ChatItem } from '@/components';
import { Chat } from '@/components/Chat/Chat.ts';

interface IChatProps {
  chatItem1?: ChatItem;
  chatItem2?: ChatItem;
  chatItem3?: ChatItem;
}

export class Chats extends Block {
  constructor(props: IChatProps) {
    super({
      ...props,
      chatItem1: new ChatItem({
        src: 'https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon-thumbnail.png',
        alt: 'avatar-cat',
        name: 'Антон',
        message: 'Привет',
        time: '14:19',
        counter_class: 'counter counter_enabled',
        counter_number: 30
      }),
      chatItem2: new ChatItem({
        src: 'https://w7.pngwing.com/pngs/924/414/png-transparent-woman-illustration-user-profile-avatar-woman-icon-girl-avatar-face-fashion-girl-heroes-thumbnail.png',
        alt: 'avatar-cat',
        name: 'Ирина',
        message: 'Идем на обед?',
        time: '12:32',
        counter_class: 'counter counter_enabled',
        counter_number: 10
      }),
      chatItem3: new ChatItem({
        src: 'https://w7.pngwing.com/pngs/550/997/png-transparent-user-icon-foreigners-avatar-child-face-heroes-thumbnail.png',
        alt: 'avatar-cat',
        name: 'Кирилл',
        message: 'Завтра все в силе?',
        time: '18:15',
        counter_class: 'counter counter_enabled',
        counter_number: 132
      }),
      chat: new Chat({})
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
