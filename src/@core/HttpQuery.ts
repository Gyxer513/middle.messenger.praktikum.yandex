enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type TOptions = {
  method: METHODS;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
};

const toStringify = (data: Record<string, any>) => {
  return `?${new URLSearchParams(data).toString()}`;
};

type HTTPMethod = (url: string, options: TOptions) => Promise<unknown>;

export class HTTPTransport {
  get: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (
    url: string,
    options: TOptions = { method: METHODS.GET },
    timeout = 5000
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method as string,
        method === METHODS.GET && !!data ? url + toStringify(data) : url
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };
}
