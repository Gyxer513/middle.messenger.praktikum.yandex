const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method?: HttpMethods;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
};

type HTTPMethod = (url: string, options: Options) => Promise<unknown>;

interface IHttp {
  get: HTTPMethod;
  post: HTTPMethod;
  put: HTTPMethod;
  delete: HTTPMethod;
  request: HTTPMethod;
}

function queryStringify(data: Record<string, unknown>): string {
  let result = '?';

  for (const [key, value] of Object.entries(data)) {
    result += `${key}=${String(value)}&`;
  }

  return result.slice(0, result.length - 1);
}

class HttpQuery implements IHttp {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: HttpMethods.GET });

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: HttpMethods.POST });

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: HttpMethods.PUT });

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: HttpMethods.DELETE });

  request: HTTPMethod = (url, options) => {
    const {
      method = HttpMethods.GET,
      headers = {},
      data,
      timeout = 1000
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const xhrUrl =
        this.baseUrl +
        url +
        (method === HttpMethods.GET && data && !(data instanceof FormData)
          ? `?${queryStringify(data)}`
          : '');

      xhr.open(method, xhrUrl);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;

      xhr.onload = () => {
        const responseData = xhr.response;

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      };

      xhr.onabort = () => reject(new Error('The request was aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Response timed out'));

      if (method === HttpMethods.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

class BaseQuery {
  http: HttpQuery;

  constructor(APIBasePath: string) {
    this.http = new HttpQuery(`https://ya-praktikum.tech/api/v2${APIBasePath}`);
  }
}

export default BaseQuery;
