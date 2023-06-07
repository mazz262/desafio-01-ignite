import { Trash } from 'phosphor-react';
import styles from './TaskList.module.css';
import { useState } from 'react';

export interface TaskListProps {
    id: string;
    content: string;
    isComplete?: boolean;
    onDeleteTask: (id: string) => void;
    onCompleted: (id: string) => void;
}

export function TaskList({ id, content, onDeleteTask, isComplete, onCompleted }:TaskListProps) {
    const [taskIsCompleted, setTaskIsCompleted] = useState(false);

    function handleDeleteTask() {
        onDeleteTask(id)
    }

    function handleOnCompletedTask() {
        {
            taskIsCompleted ? setTaskIsCompleted(false) : setTaskIsCompleted(true);
        }
        onCompleted(id)
    }

    return (
        <div className={styles.taskCard}>
            <div className={styles.rounded}>
                <input
                name="checkbox"
                type="checkbox"
                id={id}
                checked={isComplete}
                onClick={handleOnCompletedTask}
                readOnly
                />
                <label htmlFor={id}></label>
            </div>

            <span className={isComplete === true ? styles.completed : ''}>{content}</span>

            <button onClick={handleDeleteTask} type='button' >
            <Trash size={20}/>
            </button>
        </div>
    )
}