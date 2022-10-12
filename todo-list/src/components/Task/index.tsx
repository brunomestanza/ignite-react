import { Check, Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface Task {
  id: number;
  title: string;
  isDone: boolean;
}

interface TaskProps {
  task: Task;
  deleteTask: (taskToDelete: number) => void;
  toogleDoneTask: (taskToUpdate: number) => void;
}

export function Task({ task, deleteTask, toogleDoneTask }: TaskProps) {
  return (
    <div className={task.isDone ? styles.containerDone : styles.containerTodo}>
      <div className={styles.taskContainer}>
        <button className={task.isDone ? styles.checkboxDone : styles.checkboxTodo} onClick={() => toogleDoneTask(task.id)}>{task.isDone && <Check />}</button>
        <p>{task.title}</p>
      </div>
      <Trash size={24} onClick={() => deleteTask(task.id)} />
    </div>
  )
}