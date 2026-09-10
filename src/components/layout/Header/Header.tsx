import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import MobileLogoSvg from '@/assets/icons/logo-mobile.svg';
import MobileLogoTextSvg from '@/assets/icons/logo-text.svg';
import DesktopLogoSvg from '@/assets/icons/logo-desktop.svg';
import CartIcon from '@/assets/icons/cart.svg';
import styles from './Header.module.scss';

interface HeaderPropsI {
  isMobileMenuOpen: boolean;
  onMobileNavBtnClick: () => void;
}

export default function Header({ isMobileMenuOpen, onMobileNavBtnClick }: HeaderPropsI) {
  const location = useLocation();

  const pageName = location.pathname;

  const { totalCount } = useCart();

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className={`${styles.header} ${pageName !== '/' && styles['header--contrast']}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src={MobileLogoSvg} className={styles['logo__mobile']} />
          <img src={DesktopLogoSvg} className={styles['logo__desktop']} />
        </Link>
        <img src={MobileLogoTextSvg} className={styles['logo__mobile-text']} />
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles['nav--opened'] : ''}`}>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/form">Форма</NavLink>
        </nav>
        <span className={styles['nav-btn']} onClick={onMobileNavBtnClick}>
          <span></span>
        </span>
        <Link to="/cart" className={styles.cartLink}>
          <img src={CartIcon} width={32} height={32} />
          {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
        </Link>

        {isAuthenticated ? (
          <div className={styles.userMenu}>
            <span>{user?.name}</span>
            <button type="button" onClick={logout}>
              Выйти
            </button>
          </div>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
    </header>
  );
}
