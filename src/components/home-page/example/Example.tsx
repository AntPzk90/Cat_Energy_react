import { useState } from 'react';
import { ExampleI } from '@/types';
import styles from './Example.module.scss';

export default function Example({
  title,
  description,
  stats,
  images,
  priceLabel,
  price,
}: ExampleI) {
  const [rangeValue, setRangeValue] = useState(50);

  return (
    <div className={styles.example}>
      <div className={styles['example__wrapper']}>
        <h3 className={`${styles['example__title']} main-title`}>{title}</h3>
        <p className={styles['example__description']}>{description}</p>
        <ul className={styles['example__list']}>
          {stats.map((statItem) => (
            <li className={styles['example__list-item']} key={statItem.id}>
              <span className={styles['example__bold-text']}>{statItem.value}</span>
              <span className={styles['example__normal-text']}>{statItem.label}</span>
            </li>
          ))}
        </ul>
        <p
          className={`${styles['example__description']} ${styles['example__description--accent']}`}
        >
          {priceLabel} {price}
        </p>
        <div className={styles['example__slider']}>
          <img src={images.before} alt="Cat skinny." />
          <img src={images.after} alt="Cat fat." />
        </div>
        <div className={styles['example__controls']}>
          <span>было</span>
          <input
            className={styles['example__range']}
            type="range"
            min="0"
            max="100"
            onChange={(evt) => setRangeValue(Number(evt.target.value))}
            style={{ '--value': `${rangeValue}%` } as React.CSSProperties & { '--value': string }}
          />
          <span>стало</span>
        </div>
      </div>
    </div>
  );
}
