import styles from './TaskStatusCounter.module.css';

interface TaskStatusCounterProps {
  title: string;
  counter: number;
  color: string;
}

export function TaskStatusCounter ({ title, counter, color }: TaskStatusCounterProps) {
  return (
    <div>
      <span className={`${styles.title} ${color === 'blue' ? styles.blue : styles.purple}`}>{title}</span>
      <span className={styles.counter}>{counter}</span>
    </div>
  );
};
