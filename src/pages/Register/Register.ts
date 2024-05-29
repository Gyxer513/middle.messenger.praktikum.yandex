import Block from '@core/Block.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { template } from '@/pages/Login/login.template.ts';

const formHandler = new FormValidator();

interface IRegisterProps {

}

export class Register extends Block {
  constructor() {
    super();
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

