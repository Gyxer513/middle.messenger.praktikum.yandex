import { template } from './chatitem.template.ts';
import Block from '@core/Block.ts';
import './chatItem.scss';

interface IChatItemProps {
  src: string;
  alt: string;
  name: string;
  message: string;
  time: string;
  counter_class: string;
  counter_number: number;
}

export class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super({
      ...props
    });
  }
  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
