export const baseUrlMixin = (
    data: Array<unknown> | Object,
    action: string
): Array<unknown> | Object => {
    if (Array.isArray(data)) {
        return data.map(item => ({ ...item, url: action }));
    } else {
        return { ...data, url: action };
    }
};
