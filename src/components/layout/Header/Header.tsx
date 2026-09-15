import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCartStore, selectTotalCount } from '@/stores/cartStore';
import { useAuthStore, selectIsAuthenticated } from '@/stores/authStore';
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

  const totalCount = useCartStore(selectTotalCount);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const logout = useAuthStore((state) => state.logout);

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
        </nav>
        <button
          type="button"
          className={`${styles['nav-btn']} ${isMobileMenuOpen ? styles['nav-btn--opened'] : ''}`}
          onClick={onMobileNavBtnClick}
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
        </button>
        <Link to="/cart" className={styles.cartLink}>
          <img src={CartIcon} width={32} height={32} />
          {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
        </Link>

        {isAuthenticated ? (
          <div className={styles.userMenu}>
            <span className={styles.userMenu__name}>{user?.name}</span>
            <button type="button" className={styles.userMenu__logout} onClick={logout}>
              Выйти
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}
