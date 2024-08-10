export const actionMixin = (
  data: Array<unknown> | Object,
  action: string
): Array<unknown> | Object => {
  if (Array.isArray(data)) {
    return data.map(item => ({ ...item, action: action }));
  } else {
    return { ...data, action: action };
  }
};
