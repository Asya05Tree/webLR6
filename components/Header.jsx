import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useUser } from '../contexts/UserContext';
import DebugWindow from './DebugWindow';
import headerStyles from '../styles/Header.module.css';
import toggleStyles from '../styles/ToggleSwitch.module.css';

function Header({ setShowLoginModal, logo, setIsDarkMode }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { currency, toggleCurrency } = useCurrency();
  const { user, logout } = useUser();
  const [showDebug, setShowDebug] = useState(false);

  const navigate = useNavigate();

  const handleThemeToggle = () => {
    toggleTheme();
    setIsDarkMode((prev) => !prev);
  };

  const handleLoginLogout = () => {
    if (user) {
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  const toggleDebugWindow = () => {
    setShowDebug(prev => !prev);
  };

  return (
    <>
      <header className={`${headerStyles.header} ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className={headerStyles.logo}>
          <img src={logo} alt="Pet Store Logo" />
          <h1>Pet Store</h1>
        </div>
        <nav className={headerStyles['nav-links']}>
          <Link to="/" className={headerStyles['nav-link']} onClick={() => navigate('/')}>
            {language === 'uk' ? 'Головна' : 'Home'}
          </Link>
          <Link to="/promotions" className={headerStyles['nav-link']} onClick={() => navigate('/promotions')}>
            {language === 'uk' ? 'Акції' : 'Promotions'}
          </Link>
          <Link to="/new" className={headerStyles['nav-link']} onClick={() => navigate('/new')}>
            {language === 'uk' ? 'Новинки' : 'New'}
          </Link>
          <Link to="/brands" className={headerStyles['nav-link']} onClick={() => navigate('/brands')}>
            {language === 'uk' ? 'Бренди' : 'Brands'}
          </Link>
          <Link to="/about" className={headerStyles['nav-link']} onClick={() => navigate('/about')}>
            {language === 'uk' ? 'Про нас' : 'About'}
          </Link>
          <button className={headerStyles['nav-link']} onClick={toggleLanguage}>
            {language === 'uk' ? 'EN' : 'UA'}
          </button>
          <button className={headerStyles['nav-link']} onClick={toggleCurrency}>
            {currency === 'UAH' ? 'USD' : 'UAH'}
          </button>
          <div className={toggleStyles.toggleContainer}>
            <label className={toggleStyles.themeSwitch}>
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={handleThemeToggle}
                className={toggleStyles.input}
              />
              <span className={toggleStyles.slider}></span>
            </label>
          </div>
          <button className={headerStyles['nav-link']} onClick={handleLoginLogout}>
            {user
              ? (language === 'uk' ? 'Вийти' : 'Logout')
              : (language === 'uk' ? 'Увійти' : 'Login')
            }
          </button>
          <button
            className={`${headerStyles['nav-link']} ${showDebug ? headerStyles.active : ''}`}
            onClick={toggleDebugWindow}
          >
            {language === 'uk' ? 'Історія' : 'History'}
          </button>
        </nav>
      </header>
      <DebugWindow isVisible={showDebug} />
    </>
  );
}

export default Header;