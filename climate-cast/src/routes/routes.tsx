import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from '../pages/HomePage/HomePage';
import i18n from '../i18n';

export default function AppRoutes() {
  const { language } = i18n;
  useEffect(() => {
    const pathLanguage = window.location.pathname.split('/')[1];
    if (pathLanguage && pathLanguage !== language) {
      i18n.changeLanguage(pathLanguage);
    }
  }, [language]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/${language}`} />} />
        <Route path="/:lang" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
