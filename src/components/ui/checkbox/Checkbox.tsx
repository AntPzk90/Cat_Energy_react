import styles from './Checkbox.module.scss';

interface CheckboxPropsI {
  id: string;
  label: string;
  name: string;
  defaultChecked?: boolean;
  value: string;
}

export default function Checkbox({ id, label, name, defaultChecked, value }: CheckboxPropsI) {
  return (
    <div className={styles.checkbox}>
      <input
        id={id}
        type="checkbox"
        name={name}
        className={styles.checkbox__input}
        value={value}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={id} className={styles.checkbox__label}>
        <span className={styles.checkbox__box} aria-hidden="true" />
        {label}
      </label>
    </div>
  );
}
