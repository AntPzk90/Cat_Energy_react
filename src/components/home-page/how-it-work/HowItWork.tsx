import { HowItWorksI } from '@/types';
import styles from './HowItWork.module.scss';

export default function HowItWork({ title, steps }: HowItWorksI) {
  return (
    <div className={styles['how-it-work']}>
      <div className={styles['how-it-work__wrapper']}>
        <h3 className={`${styles['how-it-work__title']} main-title`}>{title}</h3>
        <ul className={styles['how-it-work__list']}>
          {steps.map((step) => (
            <li className={styles['how-it-work__item']} key={step.id}>
              <div className={styles['how-it-work__icon-holder']}>
                <img src={step.icon} className={styles['how-it-work__icon']} />
              </div>
              <p className={styles['how-it-work__description']}>{step.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
