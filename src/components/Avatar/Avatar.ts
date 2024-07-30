import Block from '@core/Block.ts';
import { template } from './avatar.template.ts';
import './avatar.scss';
import '../../assets/images/avatar.jpg';


interface IAvatarProps {
  class: string;
  src: string;
  alt: string;
  events?: Record<string, (e: Event) => void>;
}
export class Avatar extends Block {
  constructor(props: IAvatarProps) {
    super({
      ...props,
      events: {
        ...props.events
      }
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
