import Card from '@/components/ui/card/Card';
import { useCart } from '@/contexts/CartContext';
import { CardI } from '@/types';
import styles from './ProductList.module.scss';

interface ProductsPropsI {
  products: CardI[];
}

export default function ProductList({ products }: ProductsPropsI) {
  const { addItem } = useCart();

  return (
    <ul className={styles['product-list']}>
      {products.map((product) => (
        <li key={product.id}>
          <Card
            id={product.id}
            image={product.image}
            title={product.title}
            weight={product.weight}
            calories={product.calories}
            protein={product.protein}
            fat={product.fat}
            carbs={product.carbs}
            taste={product.taste}
            price={product.price}
            buttonText={product.buttonText}
            onOrderClick={() =>
              addItem({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                weight: product.weight,
                taste: product.taste,
              })
            }
          />
        </li>
      ))}
    </ul>
  );
}
