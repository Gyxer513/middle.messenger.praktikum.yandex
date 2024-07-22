import { IStoreData } from './Store.ts';
import store, { StoreEvents } from './Store.ts';
import Block from '@core/Block.ts';
import { isEqual } from '@core/utils';


export const withStore =
  (mapStateToProps: (state: IStoreData) => Record<string, unknown>) =>
    (Component: typeof Block) => {
      // @ts-expect-error
      return class WithStore extends Component {
        private state: Record<string, unknown>;

        constructor(props: Record<string, unknown>) {
          const state = mapStateToProps(store.getState());
          super({ ...props, ...state });

          this.state = state;
          store.on(StoreEvents.Updated, this.handleStoreUpdate);
          this.dispatchComponentDidMount();
        }

        private handleStoreUpdate = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(this.state, newState)) {
            this.state = newState;
            this.setProps({ ...newState });
          }
        };

        public componentWillUnmount() {
          store.off(StoreEvents.Updated, this.handleStoreUpdate);
        }
      };
    };
