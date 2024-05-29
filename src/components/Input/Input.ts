import Block from '@core/Block.ts';
import template from './input.template.ts';
import './input.scss'
import { FormValidator } from '@core/FormValidator.ts';

const formValidator = new FormValidator()

type TInputProps = {
  class_name: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
}

export class Input extends Block {

  constructor(props: TInputProps) {
    super({
      ...props, events: { input: (e: Event) => formValidator.handleInputChange(e)},
    })
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}