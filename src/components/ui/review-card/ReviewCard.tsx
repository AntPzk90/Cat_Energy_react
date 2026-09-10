// src/components/ui/review-card/ReviewCard.tsx
import type { ReviewI } from '@/types';
import styles from './ReviewCard.module.scss';

export default function ReviewCard({ author, rating, date, text }: ReviewI) {
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <li className={styles['review-card']}>
      <div className={styles['review-card__header']}>
        <span className={styles['review-card__author']}>{author}</span>
        <time className={styles['review-card__date']} dateTime={date}>
          {formattedDate}
        </time>
      </div>

      <div className={styles['review-card__rating']} aria-label={`Оценка ${rating} из 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={
              index < rating ? styles['review-card__star--filled'] : styles['review-card__star']
            }
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>

      <p className={styles['review-card__text']}>{text}</p>
    </li>
  );
}
