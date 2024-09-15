import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './styles.scss';
import './i18n';
import AppRoutes from './routes/routes';
import { FavoriteProvider } from './contexts/FavoritesContext';
import { CityProvider } from './contexts/CityContext';
import { WeatherProvider } from './contexts/WeatherContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoriteProvider>
      <CityProvider>
        <WeatherProvider>
          <MantineProvider>
            <AppRoutes />
          </MantineProvider>
        </WeatherProvider>
      </CityProvider>
    </FavoriteProvider>
  </React.StrictMode>
);
