import { Checkbox, Field, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { CompliteTodoProps } from '../TodosMenu';
import * as style from './TodosListItem.module.scss';
import { useCallback } from 'react';

type TodosListItemProps = {
    itemID: string;
    text: string;
    completed: boolean;
    onChange: (values: CompliteTodoProps) => void;
};

export const TodosListItem = ({ completed, onChange, itemID, text }: TodosListItemProps) => {

    const handleChange = useCallback((value: boolean) => {
        onChange({ itemID, checked: value })
    }, [])

    return <Field className={style.TodosListItem}>
                <Checkbox
                    checked={completed}
                    onChange={handleChange}
                    className={style.checkbox}>
                        <CheckIcon className={`${style.icon} ${completed ? style.checked : ""}`} /> 
                </Checkbox>
                <Label className={style.label}>{text}</Label>
            </Field> 
}