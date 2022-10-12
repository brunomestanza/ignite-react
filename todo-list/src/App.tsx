import { ChangeEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { Task } from './components/Task';
import { TaskStatusCounter } from './components/TaskStatusCounter';
import { TaskListEmpty } from './components/TaskListEmpty';
import { TaskInterface } from './types/Task';
import styles from './styles/App.module.css';
import './styles/global.css';

export function App() {
  const [taskList, setTaskList] = useState<TaskInterface[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const tasksDoneCounter = updateDoneCounter();

  function updateDoneCounter() {
    let counter = 0;
    taskList.forEach(task => {
      if(task.isDone === true) {
        counter = counter + 1;
      };
    });
    
    return counter;
  };

  function handleTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value);
  };

  function addTask() {
    setTaskList([...taskList, { id: Math.random(), title: taskTitle, isDone: false }]);
    setTaskTitle('');
  };

  function toogleDoneTask(id: number) {
    const checkedTasks = taskList.map(task => task.id === id ? { ...task, isDone: !task.isDone  }: task);
    setTaskList(checkedTasks);
  };

  function deleteTask(taskToDelete: number) {
    const tasksWithoutDeletedOne = taskList.filter(task => {
      return task.id !== taskToDelete;
    });
    
    setTaskList(tasksWithoutDeletedOne);
  };

  return (
    <>
      <header className={styles.header}>
        <img src="./logo.svg" alt="Logo" />
      </header>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.insertContainer}>
            <input className={styles.taskInsert} type="text" placeholder='Adicione uma tarefa' value={taskTitle} onChange={handleTaskTitle} />
            <button className={styles.insertButton} onClick={addTask}>Criar <PlusCircle size={20} /></button>
          </div>
          <div className={styles.statusCounterContainer}>
            <TaskStatusCounter title='Tarefas criadas' counter={taskList.length} color='blue' />
            <TaskStatusCounter title='Concluídas' counter={tasksDoneCounter} color='purple' />
          </div>
          { taskList.length > 0
          ? taskList.map(task => {
            return <Task task={task} deleteTask={deleteTask} toogleDoneTask={toogleDoneTask} />
          })
          : <TaskListEmpty />}
        </main>
      </div>
    </>
  );
};
