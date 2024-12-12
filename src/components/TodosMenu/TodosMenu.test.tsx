import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { TodosMenu } from './TodosMenu';
import { useState } from 'react';

describe('TodosMenu', () => {
    test('render TodosMenu', () => {
        render(<TodosMenu />);
        expect(screen.getByTestId('TodosMenu')).toBeInTheDocument();
    });
    test('test input', () => {
        render(<TodosMenu />);
        const { result } = renderHook(() => useState(''));
        const [newTask, setNewTask] = result.current;
        act(() => setNewTask('123123'));
        expect(screen.getByTestId('input')).toBeInTheDocument();
        expect(result.current[0]).toBe('123123');
    });
});
