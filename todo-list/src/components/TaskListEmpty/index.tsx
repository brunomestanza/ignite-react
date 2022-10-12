import styles from './TaskListEmpty.module.css';

export function TaskListEmpty() {
  return (
    <div className={styles.container}>
      <img src="./clipboard.svg" alt="Clipboard icon" />
      <p className={`${styles.taskEmptyDescription} ${styles.bold}`}>Você ainda não tem tarefas cadastradas</p>
      <p className={styles.taskEmptyDescription}>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}