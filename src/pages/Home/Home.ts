import Block from '@core/Block.ts';
import './home.scss';
import { template } from './home.template.ts';

export class Home extends Block {
  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}