import Block from '@core/Block.ts';
import './error.scss'
import { template } from './error.template.ts';

type TErrorProps = {
  text: string;
  error_status: number;
};

export class Error extends Block {

  constructor({text, error_status}: TErrorProps) {
    super({text, error_status});
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}