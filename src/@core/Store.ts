interface Indexed {

}

class Store {
  private state: Indexed = {};

  public getState() {
    return state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
  };
}
