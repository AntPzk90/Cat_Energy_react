import { Link } from 'react-router-dom';
import { CardI } from '@/types';
import styles from './Card.module.scss';

export default function Card({
  id,
  image,
  title,
  weight,
  calories,
  protein,
  fat,
  carbs,
  taste,
  price,
  buttonText,
  mod,
  onOrderClick,
}: CardI) {
  const specs = [
    { label: 'Масса', value: weight },
    { label: 'Калории на 100 г', value: calories },
    { label: 'Белки на 100 г', value: protein },
    { label: 'Жиры на 100 г', value: fat },
    { label: 'Углеводы на 100 г', value: carbs },
    { label: 'Вкус', value: taste },
    { label: 'Цена', value: `${price} р.` },
  ];
  return (
    <Link to={`/product/${id}`}>
      <div
        className={`${styles['product-card']} ${mod === 'page-card' && styles['product-card--page']}`}
      >
        <img
          className={`${styles['product-card__image']} ${mod === 'page-card' && styles['product-card__image--page']}`}
          src={image}
          alt={title}
        />

        <h3 className={styles['product-card__title']}>{title}</h3>

        <ul className={styles['product-card__specs']}>
          {specs.map(({ label, value }) => (
            <li key={label} className={styles['product-card__specs-item']}>
              <span>{label}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles['product-card__btn']}
          onClick={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            onOrderClick?.();
          }}
        >
          {buttonText}
        </button>
      </div>
    </Link>
  );
}
