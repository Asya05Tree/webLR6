import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

import './styles/App.css';
import Header from './components/Header';
import styles from './styles/App.module.css';
import logoLight from './assets/logoLight.png';
import logoDark from './assets/logoDark.png';

import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import LoginModal from './components/LoginModal';
import DebugWindow from './components/DebugWindow';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDebug, setShowDebug] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const currentLogo = isDarkMode ? logoDark : logoLight;

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  return (
    <ThemeProvider initialTheme={isDarkMode}>
      <UserProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <BrowserRouter>
              <div className={`${styles.app} ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
                <Header
                  setShowLoginModal={setShowLoginModal}
                  showDebug={showDebug}
                  setShowDebug={setShowDebug}
                  setIsDarkMode={setIsDarkMode}
                  logo={currentLogo}
                />
                <main className={styles.mainContent}>
                  <Routes>
                    <Route
                      path="/"
                      element={<ProductList onProductSelect={setSelectedProduct} />}
                    />
                    <Route
                      path="/product/:id"
                      element={<ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                </main>
                <Footer className={styles.footer} />
                {showLoginModal && (
                  <div className={styles.modal}>
                    <LoginModal setShowLoginModal={setShowLoginModal} />
                  </div>
                )}
                {showDebug && (
                  <div className={styles.debug}>
                    <DebugWindow />
                  </div>
                )}
              </div>
            </BrowserRouter>
          </CurrencyProvider>
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;