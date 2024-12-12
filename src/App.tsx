import { memo } from 'react';
import { TodosMenu } from './components/TodosMenu';

export const App =memo(() => {
    return <div>
                <TodosMenu />
            </div>
})