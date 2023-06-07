import styles from './TaskBoard.module.css';
import clipboard from '../assets/clipboard.svg'
import { PlusCircle } from 'phosphor-react';
import { TaskList } from './TaskList';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TaskProps = {
    id: string;
    title: string;
    isComplete?: boolean;
};

export function TaskBoard() {
    const [tasks, setTask] = useState<TaskProps[]>([]);

    const [newTask, setNewTask] = useState({} as TaskProps);
   
    function handleAddNewTask(event: FormEvent) {
        event.preventDefault();

        const newTaskList = [...tasks, newTask];
        setTask(newTaskList);

        setNewTask({
            id: uuidv4(),
            title: '',
            isComplete: false,
        });

    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewTask({
            id: uuidv4(),
            title: event.target.value,
            isComplete: false,
        });
    }

    function handleToggleTaskCompletion(id: string) {
        const editedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    isComplete: !task.isComplete,
                };
            }

            return task;
        });
        setTask(editedTasks);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');

    }

    function deleteTask(taskToDelete: string) {
        const tasksWithoutDeletedOne = tasks.filter((task) => {
            return task.id !== taskToDelete;
        })
        setTask(tasksWithoutDeletedOne);
    }

    return (
        <div className={styles.board}>
            <form onSubmit={handleAddNewTask} className={styles.todoForm}>
                <textarea
                    id="task-textarea"
                    name="task" 
                    placeholder="Adicione uma nova tarefa" 
                    value={newTask.title} 
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    required
                />

                <button type="submit">
                    Criar
                    <PlusCircle weight="bold" size={18}/>
                </button>
            </form>

            <header className={styles.tasksContainer}>
                <div className={styles.tasksCreated}>
                    <p>Tarefas criadas</p>
                    <span>{tasks.length}</span>
                </div>

                <div className={styles.tasksDone}>
                    <p>Concluídas</p>
                    <span>{tasks.filter((task) => task.isComplete).length} de {tasks.length}</span>
                </div>
            </header>

            <main className={styles.tasksBox}>
                {tasks.length === 0 ? (
                <div className={styles.tasksBoxContent}>
                    <img src={clipboard} alt="Clipboard icon" />
                    <p>
                        <strong>Você ainda não tem tarefas registradas. </strong>
                        Crie tarefas e organize seus itens a fazer</p>
                </div>
                ) : ('')}

                {tasks.map((task, index) => {
                   return <TaskList
                   key={index}
                   id={task.id}
                   content={task.title}
                   isComplete={task.isComplete}
                   onDeleteTask={deleteTask}
                   onCompleted={handleToggleTaskCompletion}
                   />
                })}

            </main>
        </div>
    )
}