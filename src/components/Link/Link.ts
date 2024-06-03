import Block from '@core/Block.ts';
import { template } from './link.template.ts';
import './link.scss'

interface ILinkProps {
  path: string;
  text: string;
  onClick?: (e: Event) => void;
}

export class Link extends Block {
  constructor({ path, text, onClick }: ILinkProps) {
    super({
      path,
      text,
      events: {
        click: onClick,
      }
    });
  }
  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
