import {IStoreData} from './Store.ts';
import store, {StoreEvents} from './Store.ts'
import Block from '@core/Block.ts';
import {isEqual} from '@core/utils';

export const withStore = (mapStateToProps: (state: IStoreData) => Record<string, unknown>) => (Component: typeof Block) => {
  let state: Record<string, unknown>;

  return class extends Component {
    constructor(props) {
      state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }
      });
    }
  };
};