import Block from '@core/Block.ts';
import template from './input.template.ts';
import './input.scss'

type TInputProps = {
  class_name: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
}

export class Input extends Block<Object> {

  constructor({ class_name, name, type, placeholder = '', value }: TInputProps) {
    super({ class_name, name, type, placeholder, value });
  }

  protected render(): string {
    return template;
  }
}