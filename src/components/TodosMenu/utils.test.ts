import { TODOS } from './mock';
import { completeTask, getActiveTodos, getCompletedTodos } from './utils';

describe('getActiveTodos', () => {
    test('with values', () => {
        expect(getActiveTodos(TODOS)).toStrictEqual([
            {
                id: 'string1',
                text: 'Тестовое задание',
                completed: false,
            }, 
            {
                id: 'string3',
                text: 'Покрытие тестами',
                completed: false,
            }, 
        ]);
    });

    test('without values', () => {
        expect(getActiveTodos([])).toStrictEqual([]);
    });
});

describe('getCompletedTodos', () => {
    test('with values', () => {
        expect(getCompletedTodos(TODOS)).toStrictEqual([
            {
                id: 'string2',
                text: 'Прекрасный код',
                completed: true,
            }
        ]);
    });

    test('without values', () => {
        expect(getActiveTodos([])).toStrictEqual([]);
    });
});

describe('completeTask', () => {
    test('with values', () => {
        expect(completeTask({todos: [{
            id: 'string2',
            text: 'Прекрасный код',
            completed: false,
        }], itemID: 'string2', checked: true})).toStrictEqual([
            {
                id: 'string2',
                text: 'Прекрасный код',
                completed: true,
            }
        ]);
    })
})
