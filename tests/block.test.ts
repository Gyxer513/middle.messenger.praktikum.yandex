import Block from '../src/@core/Block';

// Создаем простой класс для тестирования, наследуя его от Block
class TestBlock extends Block
{
    constructor(props: {content: string}) {
        super({...props});
    }
    render(): HTMLElement {
        return this.compile('<div>{{content}}</div>', this.props);
    }
}

describe('Block', () => {
    let testBlock: TestBlock;

    beforeEach(() => {
        // Создаем новый экземпляр TestBlock перед каждым тестом
        testBlock = new TestBlock({ content: 'Test Content' });
    });

    it('должен инициализироваться с правильными пропсами', () => {
        expect(testBlock.props.content).toBe('Test Content');
    });

    it('должен рендерить правильный HTML контент', () => {
        const element = testBlock.getContent();
        expect(element.innerHTML).toBe('Test Content');
    });

    it('должен обновлять контент при изменении пропсов', () => {
        testBlock.setProps({ content: 'Updated Content' });
        const element = testBlock.getContent();
        expect(element.innerHTML).toBe('Updated Content');
    });


    it('должен вызывать componentDidMount после монтирования', () => {
        const componentDidMountSpy = jest.spyOn(testBlock, 'componentDidMount');
        testBlock.dispatchComponentDidMount();

        expect(componentDidMountSpy).toHaveBeenCalled();
    });

});
