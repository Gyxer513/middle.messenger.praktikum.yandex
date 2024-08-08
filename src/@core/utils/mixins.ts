import store from '@core/Store/Store.ts';

export const messageMixin = (messages: Array<Record<string, string>>) => {
  const currentUserId = store.getState().userData.id;
  if (Array.isArray(messages)) {
    let newArr: Array<Record<string, string>> = [];
    messages.map((m: Record<string, string>) => {
      if (m.user_id == currentUserId.toString()) {
        newArr.push({ ...m, cls: 'chat__receiver' });
      } else {
        newArr.push({ ...m, cls: 'chat__sender' });
      }
    });
    return newArr;
  }
};
