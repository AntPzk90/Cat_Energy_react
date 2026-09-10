import styles from './Pagination.module.scss';

interface PaginationPropsI {
  currentPage: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, pagesCount, onPageChange }: PaginationPropsI) {
  if (pagesCount <= 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  return (
    <ul className={styles.pagination}>
      <li>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Назад
        </button>
      </li>

      {pages.map((page) => (
        <li key={page}>
          <button
            type="button"
            className={page === currentPage ? styles.active : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li>
        <button
          type="button"
          disabled={currentPage === pagesCount}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Вперёд
        </button>
      </li>
    </ul>
  );
}
