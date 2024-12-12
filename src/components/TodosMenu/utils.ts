import { TodoType } from "./TodosMenu";

type CompleteTaskPropsType = {
    todos: TodoType[];
    itemID: string;
    checked: boolean;
}

export const getActiveTodos = (todos: TodoType[]) => todos.filter(({ completed })=> completed !== true)
    
export const getCompletedTodos = (todos: TodoType[]) => todos.filter(({ completed })=> completed === true)

export const completeTask =({todos, itemID , checked}: CompleteTaskPropsType) => todos.map(({ id, text, completed }) => {
    if(id===itemID) {
        return ({
            completed: checked,
            id,
            text
        })
    }
    return { id, text, completed }
})
    