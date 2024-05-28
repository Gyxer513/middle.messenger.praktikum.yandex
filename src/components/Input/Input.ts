import Block from '@core/Block.ts';
import template from './input.template.ts';
import './input.scss'

type TInputProps = {
  class_name: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  error_text?: string;
  id?: string;
  disabled?: boolean;
}

export class Input extends Block {

  constructor(props: TInputProps) {
    super(props);
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}