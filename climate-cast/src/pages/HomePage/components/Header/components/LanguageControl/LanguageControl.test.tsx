import { render, screen } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import LanguageControl from './LanguageControl';
import i18n from '../../../../../../i18n';
import { FavoriteProvider } from '../../../../../../contexts/FavoritesContext';
import { CityProvider } from '../../../../../../contexts/CityContext';

const { language } = i18n;

function MockLanguageControl() {
  return (
    <FavoriteProvider>
      <CityProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to={`/${language}`} />} />
              <Route path="/:lang" element={<LanguageControl />} />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('LanguageControl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render LanguageControl correctly with language options', () => {
    render(<MockLanguageControl />);
    expect(screen.getByDisplayValue(language));
  });
});
