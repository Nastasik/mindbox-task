import { memo, useState, ChangeEvent, useEffect, useCallback } from 'react';
import { Input, Button, TabGroup, TabList, Tab } from '@headlessui/react'
import { TodosListItem } from './components/TodosListItem';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import * as style from './TodosMenu.module.scss';
import { completeTask, getActiveTodos, getCompletedTodos } from './utils';
import { TODOS } from './mock';

export type TodoType = {
    id: string;
    text: string;
    completed: boolean;
}

export type CompliteTodoProps = {
    checked: boolean;
    itemID: string;
}

export const TodosMenu = memo(() => {
    const [todos, setTodos] = useState(TODOS);
    const [filtredTodos, setFiltredTodos] = useState(TODOS);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('All');
    const [activeLength, setActiveLength] = useState('');
    const [listIsOpened, setListIsOpened] = useState(true);

    useEffect(() => {
        if(filter === 'All') selectAllTodos()
        if(filter === 'Active') selectActiveTodos()
        if(filter === 'Completed') selectCompletedTodos()
        getActiveTodosLength()
    }, [todos])

    const getActiveTodosLength = useCallback(() => {
        const activeTodosLength = getActiveTodos(todos).length;
        setActiveLength(`${activeTodosLength} items left`);
    }, [todos])

    const completeTodo = useCallback(({ checked, itemID }: CompliteTodoProps) => {
        setTodos((todos) => completeTask({ todos, checked, itemID }))
    }, [])

    const addNewTask = useCallback(() => {
        setTodos((todos) =>[...todos, { text: newTask, id: newTask, completed: false } ])
    },[newTask])

    const changeInput = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {
        setNewTask(target.value)
    }, [])

    const selectAllTodos = useCallback(() => {
        setFiltredTodos(todos)
        setFilter('All')
    }, [todos])
    const selectActiveTodos = useCallback(() => {
        setFiltredTodos(getActiveTodos(todos))
        setFilter('Active')
    }, [todos])
    const selectCompletedTodos = useCallback(() => {
        setFiltredTodos(getCompletedTodos(todos))
        setFilter('Completed')
    }, [todos])

    const clearCompleted = useCallback(() => {
        setTodos((todos) => getActiveTodos(todos))
    }, [])

    const openTodosList = useCallback(() => {
        setListIsOpened((listIsOpened) => !listIsOpened)
    }, [])

    return  <div data-testid="TodosMenu" className={style.menu}>
                <div className={style.menuHeader}>
                    <Button data-testid="chevronButton" onClick={openTodosList} className={style.chevronButton}>
                        <ChevronDownIcon className={style.chevron} />
                    </Button>
                    <Input data-testid="input" className={style.input} value={newTask} onChange={changeInput} name="full_name" type="text" placeholder='What needs to be done?'/>
                    <Button onClick={addNewTask} className={style.addTodoButton}>+</Button>
                </div>  
                <div data-testid="list" className={`${style.list} ${listIsOpened ? style.openList: ''}`}>
                    {filtredTodos.map(({completed, text, id}) => (   
                        <TodosListItem key={id} itemID={id} onChange={completeTodo} text={text} completed={completed}/>
                    ))}
                    <div className={style.menuFooter}>
                        <span>{activeLength}</span>
                        <TabGroup>
                            <TabList>
                                <Tab className={style.tab} onClick={selectAllTodos}>All</Tab>
                                <Tab className={style.tab} onClick={selectActiveTodos}>Active</Tab>
                                <Tab className={style.tab} onClick={selectCompletedTodos}>Completed</Tab>
                            </TabList>
                        </TabGroup>
                        <Button onClick={clearCompleted} className={style.clearCompletedButton}>
                            Clear completed
                        </Button>
                    </div>
                </div>          
            </div>
})