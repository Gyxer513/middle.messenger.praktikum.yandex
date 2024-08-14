import Store from "../src/@core/Store/Store";

describe('Store', () => {
    let store: typeof Store;

    beforeEach(() => {
        store = new Store();
    });

    test('initial state is correct', () => {
        expect(store.getState()).toEqual({ messages: [] });
    });
});