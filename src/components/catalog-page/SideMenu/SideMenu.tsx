import { FormEvent } from 'react';

import Checkbox from '@/components/ui/checkbox/Checkbox';
import Radio from '@/components/ui/radio/Radio';
import Select from '@/components/ui/select/Select';
import Button from '@/components/ui/button/Button';

import { FILTERS } from '@/constants';
import { FiltersItemI } from '@/types';

import styles from './SideMenu.module.scss';

interface SideMenuI {
  mainTitle: string;
  price: FiltersItemI;
  categoryType: FiltersItemI;
  componentsType: FiltersItemI;
}

interface SideMenuPropsI {
  onFormSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  isActive: boolean;
  priceSort: string;
  componentSort: string;
  categories: string[];
}

export default function SideMenu({
  onFormSubmit,
  isActive = false,
  priceSort,
  componentSort,
  categories,
}: SideMenuPropsI) {
  const { mainTitle, price, categoryType, componentsType }: SideMenuI = FILTERS;

  return (
    <aside className={`${styles['side-menu']} ${isActive ? styles['side-menu--active'] : ''}`}>
      <b className={styles['side-menu__title']}>{mainTitle}</b>
      <form onSubmit={onFormSubmit}>
        <ul className={styles['side-menu__list']}>
          <li className={styles['side-menu__item']}>
            <p className={styles['side-menu__sub-title']}>{price.subTitle}</p>
            <Select
              id={'price-sort'}
              name={'price'}
              options={price.items}
              defaultValue={priceSort}
            />
          </li>
          <li className={styles['side-menu__item']}>
            <p className={styles['side-menu__sub-title']}>{componentsType.subTitle}</p>
            {componentsType.items.map((componentsTypeFilterItem) => (
              <Radio
                id={componentsTypeFilterItem.type}
                name={'componentsType'}
                label={componentsTypeFilterItem.label}
                key={componentsTypeFilterItem.type}
                value={componentsTypeFilterItem.type}
                defaultChecked={(componentSort || 'protein') === componentsTypeFilterItem.type}
              ></Radio>
            ))}
          </li>
          <li className={styles['side-menu__item']}>
            <p className={styles['side-menu__sub-title']}>{categoryType.subTitle}</p>
            {categoryType.items.map((categoryTypeFilterItem) => (
              <Checkbox
                id={categoryTypeFilterItem.type}
                name={'category'}
                label={categoryTypeFilterItem.label}
                key={categoryTypeFilterItem.type}
                value={categoryTypeFilterItem.type}
                defaultChecked={categories.includes(categoryTypeFilterItem.type)}
              ></Checkbox>
            ))}
          </li>
        </ul>
        <Button>{'Отправить'}</Button>
      </form>
    </aside>
  );
}
