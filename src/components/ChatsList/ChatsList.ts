import Block from '@core/Block.ts';

import { template } from './chatsList.template.ts';
import './chatList.scss';

interface IChatItemProps {
  src: string;
  alt: string;
  name: string;
  message: string;
  time: string;
  counter_class: string;
  counter_number: number;
}

export class ChatsList extends Block {
  constructor(props: IChatItemProps) {
    super({
      ...props
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
