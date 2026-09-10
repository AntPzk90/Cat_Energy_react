import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Загрузка">
      <span className={styles.spinner} />
    </div>
  );
}
