import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import ErrorBoundary from '@/components/ui/error-boundary/ErrorBoundary';

import styles from './Layout.module.scss';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMneuOpen] = useState(false);

  const mobileMenuBtnClickHandler = () => {
    setIsMobileMneuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Header isMobileMenuOpen={isMobileMenuOpen} onMobileNavBtnClick={mobileMenuBtnClickHandler} />
      <main className={styles.main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      {isMobileMenuOpen && <div className="overlay" onClick={mobileMenuBtnClickHandler}></div>}
    </>
  );
}
