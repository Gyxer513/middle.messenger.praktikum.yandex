import EventBus from '@core/EventBus.ts';
import { set } from '@core/utils';
import { TUserData } from '@core/api/services/user.ts';

export enum StoreEvents {
  Updated = 'updated'
}

export interface IStoreData {
  userData: TUserData;
  messages: Record<string, string>;
  chats: Array<unknown>,
}

const initialState = {
  userData: {
    avatar: "",
    phone: "",
    email: "",
    login: "",
    id: -1,
    second_name: "",
    first_name: "",
    display_name: "",
  },
  messages: {},
  chats: [],
};

class Store extends EventBus {
  state: IStoreData;

  constructor(initialState: IStoreData) {
    super();
    this.state = initialState;
    this.on(StoreEvents.Updated, () => null);
  }

  public getState() {
    console.log(this.state);
    return this.state;
  }

  public setState(path: string, value: unknown): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated, this.getState());
  }
}

export default new Store(initialState);
