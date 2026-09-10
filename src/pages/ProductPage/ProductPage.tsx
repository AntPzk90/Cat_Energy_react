import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/services/api';
import { CardI, ReviewI } from '@/types';
import Loader from '@/components/ui/loader/Loader';
import Breadcrumbs from '@/components/ui/breadcrumbs/BreadCrumbs';
import Card from '@/components/ui/card/Card';
import ReviewCard from '@/components/ui/review-card/ReviewCard';
import styles from './ProductPage.module.scss';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<CardI | null>(null);
  const [reviews, setReviews] = useState<ReviewI[]>([]);

  const [fetchProduct, isLoading, error] = useFetch(() => api.get<CardI>(`/products/${id}`));
  const [fetchReviews, isReviewsLoading, reviewsError] = useFetch(() =>
    api.get<ReviewI[]>(`/reviews?productId:eq=${id}`),
  );

  const loadProductData = async () => {
    const result = await fetchProduct();
    if (result) setProduct(result);
  };

  const loadReviews = async () => {
    const result = await fetchReviews();
    if (result) setReviews(result);
  };

  useEffect(() => {
    loadProductData();
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className={styles['product-page']}>
      {isLoading && <Loader />}

      {error && <p className={styles.error}>{error.message}</p>}

      {!isLoading && !error && product && (
        <div className={styles['product-page__wrapper']}>
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Каталог товаров', path: '/catalog' },
              { label: product.title },
            ]}
          />
          <h1 className={`${styles['product-page__title']} main-title`}>{product.title}</h1>
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
            mod={'page-card'}
            onOrderClick={() => {
              console.log('order');
            }}
          />
          {!isReviewsLoading && !reviewsError && (
            <ul className={styles.reviews}>
              {reviews.length > 0 ? (
                reviews.map((review) => <ReviewCard key={review.id} {...review} />)
              ) : (
                <p>Отзывов пока нет — будьте первым!</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
