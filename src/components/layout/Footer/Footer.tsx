import MobileLogoTextSvg from '@/assets/icons/logo-text.svg';
import InstIcon from '@/assets/icons/inst-icon.svg';
import FbIcon from '@/assets/icons/fb-icon.svg';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <img src={MobileLogoTextSvg} />
      </div>
      <div className={styles.inner}>
        <ul className={styles.social}>
          <li>
            <a href="#">
              <img src={InstIcon} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={FbIcon} />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.inner}>
        <span>© {new Date().getFullYear()} React Cat Enerry</span>
      </div>
    </footer>
  );
}
