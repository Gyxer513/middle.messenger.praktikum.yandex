import { template } from './chat.template.ts';
import './chat.scss';
import Block from '@core/Block.ts';

export class Chat extends Block {
  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
