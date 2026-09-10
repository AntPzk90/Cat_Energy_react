import { BannerI } from '@/types';
import Button from '../../ui/button/Button';
import styles from './MainBanner.module.scss';
import MainBannerImage from '@/assets/images/index-can-mobile.png';
import { Link } from 'react-router-dom';

export default function MainBanner({ title, subtitle, image, buttonText, buttonLink }: BannerI) {
  console.log(title, subtitle, image, buttonText, buttonLink);
  return (
    <div className={styles['main-banner']}>
      <div className={styles['main-banner__wrapper']}>
        <div className={styles['main-banner__text-block']}>
          <h1 className={`${styles['main-banner__title']} main-title`}>{title}</h1>
          <p className={styles['main-banner__slogan']}>{subtitle}</p>
        </div>
        <div className={styles['main-banner__btn-wrapper']}>
          <Link to={buttonLink}>
            <Button className={styles.cta}>
              <span>{buttonText}</span>
            </Button>
          </Link>
        </div>
        <div className={styles['main-banner__art-wrapper']}>
          <img className={styles['main-banner__art']} src={MainBannerImage} alt="Main Image." />
        </div>
      </div>
      <div className={styles['main-banner__bg']}></div>
    </div>
  );
}
