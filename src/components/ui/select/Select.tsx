// src/components/ui/select/Select.tsx
import type { FilterOptionI } from '@/types';
import styles from './Select.module.scss';

interface SelectPropsI {
  id: string;
  label?: string;
  options: FilterOptionI[];
  onChange?: (value: string) => void;
}

export default function Select({ id, label, options, onChange }: SelectPropsI) {
  return (
    <div className={styles.select}>
      {label && (
        <label htmlFor={id} className={styles.select__label}>
          {label}
        </label>
      )}

      <div className={styles.select__wrapper}>
        <select
          id={id}
          className={styles.select__field}
          name={'price'}
          onChange={(evt) => onChange?.(evt.target.value)}
        >
          {options.map(({ label: optionLabel, type }) => (
            <option key={type} value={type}>
              {optionLabel}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
