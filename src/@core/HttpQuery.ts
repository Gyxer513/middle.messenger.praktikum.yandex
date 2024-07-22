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
  withCredentials?: boolean;
  timeout?: number;
  retries?: number;
};

type HTTPMethod = (url: string, options: Options) => Promise<unknown>;

interface IHttp {
  get: HTTPMethod;
  post: HTTPMethod;
  put: HTTPMethod;
  delete: HTTPMethod;
  request: HTTPMethod;
}

class HttpQuery implements IHttp {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get: HTTPMethod = (url, options) =>
    this.request(this.baseUrl + url, { ...options, method: HttpMethods.GET });

  post: HTTPMethod = (url, options) =>
    this.request(this.baseUrl + url, { ...options, method: HttpMethods.POST });

  put: HTTPMethod = (url, options) =>
    this.request(this.baseUrl + url, { ...options, method: HttpMethods.PUT });

  delete: HTTPMethod = (url, options) =>
    this.request(this.baseUrl + url, {
      ...options,
      method: HttpMethods.DELETE
    });

  request: HTTPMethod = (
    url,
    options = {
      method: HttpMethods.GET,
      timeout: 5000
    }
  ) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const {
        method = HttpMethods.GET,
        data,
        headers,
        timeout = 5000,
        withCredentials = true
      } = options;

      xhr.open(method, url);

      if (headers !== undefined) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = 'json';

      xhr.onreadystatechange = function onReadyStateChange() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.onabort = () => reject(new Error('This request has been rejected'));
      xhr.ontimeout = () => reject(new Error('Request timed out'));
      xhr.onerror = () => reject(new Error('Request error'));

      if (method === HttpMethods.GET || !data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
}

class BaseQuery {
  http: HttpQuery;

  constructor(APIBasePath: string) {
    this.http = new HttpQuery(`https://ya-praktikum.tech/api/v2${APIBasePath}`);
  }
}

export default BaseQuery;
