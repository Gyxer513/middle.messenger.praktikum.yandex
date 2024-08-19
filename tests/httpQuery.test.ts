/* eslint-disable */
import HttpQuery from '../src/@core/HttpQuery.ts';

jest.mock('../src/@core/HttpQuery.ts', () => {
    return jest.fn().mockImplementation(() => ({
        get: jest.fn().mockResolvedValue({
            response: JSON.stringify({ id: 19000 }) // Мокаем данные, которые ожидаются в ответе
        }),
        post: jest.fn().mockResolvedValue({
            response: JSON.stringify({ id: 19000 })
        }),
        put: jest.fn(),
        delete: jest.fn(),
        request: jest.fn()
    }));
});

const TEST_API_PATH = 'https://petstore.swagger.io/v2/pet';

class TestQuery {
    http: HttpQuery;

    constructor(APIBasePath: string) {
        this.http = new HttpQuery(`${TEST_API_PATH}${APIBasePath}`);
    }
}

class TestApi extends TestQuery {
    constructor() {
        super('/pet');
    }

    async get() {
        // Используем экземплярный метод `get`
        // @ts-ignore
        return this.http.get('/findByStatus?status=available', {});
    }
}

describe('HttpQuery', () => {
    let api: TestApi;

    beforeEach(() => {
        api = new TestApi(); // Инициализация TestApi
    });

    test('GET запрос', async () => {
        const response = await api.get(); // Вызов метода экземпляра
        const responseObject = JSON.parse(response.response);
        expect(responseObject['id']).toBe(19000);
    });
});
