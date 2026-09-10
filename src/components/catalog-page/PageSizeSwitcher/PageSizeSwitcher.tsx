import styles from './PageSizeSwitcher.module.scss';

interface PageSizeSwitcherPropsI {
  value: number;
  onChange: (value: number) => void;
}

const OPTIONS = [3, 6];

export default function PageSizeSwitcher({ value, onChange }: PageSizeSwitcherPropsI) {
  return (
    <div className={styles.switcher}>
      <span>Показывать:</span>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={option === value ? styles.active : undefined}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
