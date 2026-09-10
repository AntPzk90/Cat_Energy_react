import { AddressI } from '@/types';
import styles from './Address.module.scss';

export default function Address({ title, address, city }: AddressI) {
  return (
    <div className={styles.address}>
      <div className={styles['address__wrapper']}>
        <p className={styles['address__title']}>{title}</p>
        <p className={styles['address__description']}>
          {address} <br /> {city}
        </p>
      </div>
    </div>
  );
}
