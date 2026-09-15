// src/pages/Cart/Cart.tsx
import { Link } from 'react-router-dom';
import { useCartStore, selectTotalPrice } from '@/stores/cartStore';
import CartItem from '@/components/cart/cart-item/CartItem';
import Button from '@/components/ui/button/Button';
import styles from './Cart.module.scss';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <section className={styles.cart}>
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__empty}>
            <p>Корзина пока пуста</p>
            <Link to="/catalog">
              <Button variant="primary">Перейти в каталог</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <div className={styles.cart__wrapper}>
        <h1 className={`${styles.cart__title} main-title`}>Корзина</h1>

        <ul className={styles.cart__list}>
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </ul>

        <div className={styles.cart__footer}>
          <Button variant="secondary" onClick={clearCart}>
            Очистить корзину
          </Button>

          <span className={styles.cart__total}>Итого: {totalPrice} р.</span>

          <Button variant="primary">Оформить заказ</Button>
        </div>
      </div>
    </section>
  );
}
