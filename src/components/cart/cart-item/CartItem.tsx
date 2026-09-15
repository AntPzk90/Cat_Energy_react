// src/components/cart-page/CartItem/CartItem.tsx
import type { CartItemI } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import styles from './CartItem.module.scss';

export default function CartItem({ id, title, image, price, weight, taste, quantity }: CartItemI) {
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <li className={styles['cart-item']}>
      <img className={styles['cart-item__image']} src={image} alt={title} />

      <div className={styles['cart-item__info']}>
        <h3 className={styles['cart-item__title']}>{title}</h3>
        <p className={styles['cart-item__meta']}>
          {weight} · {taste}
        </p>
      </div>

      <div className={styles['cart-item__quantity']}>
        <button
          type="button"
          onClick={() => changeQuantity(id, quantity - 1)}
          aria-label="Уменьшить количество"
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          onClick={() => changeQuantity(id, quantity + 1)}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>

      <span className={styles['cart-item__price']}>{price * quantity} р.</span>

      <button
        type="button"
        className={styles['cart-item__remove']}
        onClick={() => removeItem(id)}
        aria-label={`Удалить ${title} из корзины`}
      >
        ✕
      </button>
    </li>
  );
}
