import './changePass.scss'
import Block from '@core/Block.ts';
import { template } from '@/pages/Error/error.template.ts';

interface IChangePassProps {

}

export class ChangePass extends Block {
constructor() {
  super();
}


  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}


