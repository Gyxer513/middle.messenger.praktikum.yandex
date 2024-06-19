import EventBus from '@core/EventBus.ts';
import { set } from '@core/utils';
import { TUserData } from '@core/api/services/user.ts';

export enum StoreEvents {
  Updated = 'updated'
}

export interface IStoreData {
  userData: TUserData;
}

const initialState = {
  userData: {}
};

class Store extends EventBus {
  state: IStoreData;

  constructor(initialState: IStoreData) {
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
