import { useEffect, useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/services/api';
import { CardI, PaginatedResponseI } from '@/types';
import Loader from '@/components/ui/loader/Loader';
import styles from './Catalog.module.scss';
import ProductList from '@/components/catalog-page/ProductList/ProductList';
import SideMenu from '@/components/catalog-page/SideMenu/SideMenu';
import PageSizeSwitcher from '@/components/catalog-page/PageSizeSwitcher/PageSizeSwitcher';
import Pagination from '@/components/catalog-page/Pagination/Pagination';
import Button from '@/components/ui/button/Button';

interface FiltersStateI {
  priceSort: 'asc' | 'desc' | '';
  componentSort: 'protein' | 'fat' | 'carbs' | '';
  categories: string[];
  page: number;
  perPage: number;
}

const DEFAULT_PER_PAGE = 6;

const parseFilters = (searchParams: URLSearchParams): FiltersStateI => {
  const priceSort = searchParams.get('price');
  const componentSort = searchParams.get('component');
  const categoriesParam = searchParams.get('category');
  const page = Number(searchParams.get('page'));
  const perPage = Number(searchParams.get('perPage'));

  return {
    priceSort: priceSort === 'asc' || priceSort === 'desc' ? priceSort : '',
    componentSort:
      componentSort === 'protein' || componentSort === 'fat' || componentSort === 'carbs'
        ? componentSort
        : '',
    categories: categoriesParam ? categoriesParam.split(',') : [],
    page: page > 0 ? page : 1,
    perPage: perPage > 0 ? perPage : DEFAULT_PER_PAGE,
  };
};

const filtersToSearchParams = (filters: FiltersStateI): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.priceSort) params.set('price', filters.priceSort);
  if (filters.componentSort) params.set('component', filters.componentSort);
  if (filters.categories.length > 0) params.set('category', filters.categories.join(','));
  params.set('page', String(filters.page));
  params.set('perPage', String(filters.perPage));

  return params;
};

export default function Catalog() {
  const [products, setProducts] = useState<CardI[]>([]);
  const [pagesCount, setPagesCount] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = parseFilters(searchParams);

  const buildProductsQuery = (filters: FiltersStateI): string => {
    const params = new URLSearchParams();

    if (filters.categories.length > 0) {
      params.set('category:in', filters.categories.join(','));
    }

    const sortFields: string[] = [];
    if (filters.priceSort) {
      sortFields.push(filters.priceSort === 'desc' ? '-price' : 'price');
    }
    if (filters.componentSort) {
      sortFields.push(`-${filters.componentSort}`);
    }
    if (sortFields.length > 0) {
      params.set('_sort', sortFields.join(','));
    }

    params.set('_page', String(filters.page));
    params.set('_per_page', String(filters.perPage));

    return params.toString().replace(/%2C/g, ',');
  };

  const [fetchProducts, isLoading, error] = useFetch((currentFilters: FiltersStateI) => {
    const query = buildProductsQuery(currentFilters);
    return api.get<PaginatedResponseI<CardI>>(`/products?${query}`);
  });

  const loadProducts = async (currentFilters: FiltersStateI) => {
    const result = await fetchProducts(currentFilters);
    if (result) {
      setProducts(result.data);
      setPagesCount(result.pages);
    }
  };

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);

    const nextFilters: FiltersStateI = {
      ...filters,
      priceSort: (formData.get('price') as FiltersStateI['priceSort']) || '',
      componentSort: (formData.get('componentsType') as FiltersStateI['componentSort']) || '',
      categories: formData.getAll('category') as string[],
      page: 1,
    };

    setSearchParams(filtersToSearchParams(nextFilters));
  };

  const onPageChange = (page: number) => {
    setSearchParams(filtersToSearchParams({ ...filters, page }));
  };

  const onPerPageChange = (perPage: number) => {
    setSearchParams(filtersToSearchParams({ ...filters, perPage, page: 1 }));
  };

  const onFilterBtnClick = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    loadProducts(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <section className={styles.catalog}>
      <div className={styles['catalog__wrapper']}>
        <h1 className={`${styles['catalog__title']} main-title`}>{'Каталог товаров'}</h1>

        <SideMenu
          key={`${filters.priceSort}|${filters.componentSort}|${filters.categories.join(',')}`}
          isActive={showFilter}
          onFormSubmit={onFormSubmit}
          priceSort={filters.priceSort}
          componentSort={filters.componentSort}
          categories={filters.categories}
        />

        {isLoading && <Loader />}
        {error && <p className={styles.error}>{error.message}</p>}
        {!isLoading && !error && (
          <div className={styles['catalog__top-menu']}>
            <Button onClick={onFilterBtnClick} className={styles['catalog__filters-btn']}>
              {'Filters'}
            </Button>
            <PageSizeSwitcher value={filters.perPage} onChange={onPerPageChange} />
          </div>
        )}
        {!isLoading && !error && <ProductList products={products} />}
        {!isLoading && !error && (
          <Pagination
            currentPage={filters.page}
            pagesCount={pagesCount}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
}
