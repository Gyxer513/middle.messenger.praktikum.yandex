import Block from '@core/Block.ts';
import template from './input.template.ts';

type TInputProps = {
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
}

export class Input extends Block<Object> {

  constructor({ name, type, placeholder = '', value }: TInputProps) {
    super({ name, type, placeholder, value });
  }

  protected render(): string {
    return template;
  }
}