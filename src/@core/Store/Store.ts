import EventBus from '@core/EventBus.ts';
import { set }from '@core/utils'
import {Indexed} from '@core/utils/merge.ts';

export enum StoreEvents {
  Updated = 'updated',
}

export interface IStoreData {
  userData: any;
}

const initialState = {
 userData: {},
}

class Store extends EventBus {
  private state: Indexed;

  constructor(initialState) {
    super();
    this.state = initialState;
  }

  public getState() {
    console.log(this.state);
    return this.state;
  }

  public setState(path: string, value: unknown): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store(initialState);

