import styles from './Radio.module.scss';

interface RadioPropsI {
  id: string;
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  value: string;
  defaultChecked: boolean;
}

export default function Radio({ id, name, label, value, defaultChecked }: RadioPropsI) {
  return (
    <div className={styles.radio}>
      <input
        id={id}
        name={name}
        type="radio"
        className={styles.radio__input}
        value={value}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={id} className={styles.radio__label}>
        <span className={styles.radio__box} aria-hidden="true" />
        {label}
      </label>
    </div>
  );
}
