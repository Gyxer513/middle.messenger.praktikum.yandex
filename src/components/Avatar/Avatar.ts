import Block from '@core/Block.ts';

import { template } from './avatar.template.ts';
import './avatar.scss';
import '../../assets/images/avatar.jpg';

interface IAvatarProps {
  class: string;
  src: string;
  alt: string;
  onChange: (file: File) => void;
}
export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super({ ...props,  onChange: props?.onChange,
          events: { change: (e: InputEvent) => {
            console.log('change', e);
           this.props.onChange(e.target);
          }
          } });
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}
