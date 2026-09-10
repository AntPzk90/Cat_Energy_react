// src/components/ui/breadcrumbs/Breadcrumbs.tsx
import { Link } from 'react-router-dom';
import { BreadcrumbItemI } from '@/types';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsPropsI {
  items: BreadcrumbItemI[];
}

export default function Breadcrumbs({ items }: BreadcrumbsPropsI) {
  return (
    <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbs__list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className={styles.breadcrumbs__item}>
              {item.path && !isLast ? (
                <Link to={item.path} className={styles.breadcrumbs__link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbs__current} aria-current="page">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className={styles.breadcrumbs__separator} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
