import Block from '@core/Block.ts';
import { template } from './avatar.template.ts';
import './avatar.scss';
import '../../assets/images/avatar.jpg';
import { withStore } from '@core/Store/withStore.ts';

interface IAvatarProps {
  class: string;
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
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

const withUserAvatarStore = withStore(state => ({
  src: state.userData.avatar
}));

const withAvatarChatStore = withStore(state => ({
  src: state.currentChatAvatar
}));

export const AvatarWithUserStore = withUserAvatarStore(Avatar);
export const AvatarWithChatsStore = withAvatarChatStore(Avatar);
