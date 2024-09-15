import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SearchBar from './SearchBar';
import i18n from '../../../../../../i18n';
import { CityProvider } from '../../../../../../contexts/CityContext';
import { FavoriteProvider } from '../../../../../../contexts/FavoritesContext';

const { language } = i18n;

// Mock component for testing
function MockSearchBar() {
  return (
    <FavoriteProvider>
      <CityProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to={`/${language}`} />} />
              <Route path="/:lang" element={<SearchBar />} />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('SearchBar', () => {
  it('should render SearchBar correctly', () => {
    render(<MockSearchBar />);
    expect(screen.getByPlaceholderText('Search...'));
  });

  it('should render SearchBar favoriteList correctly', () => {
    render(<MockSearchBar />);

    const favoritesList = localStorage.getItem('favoritesList');

    if (favoritesList) {
      const list = JSON.parse(favoritesList);

      list.forEach((value: string) => {
        expect(screen.getByText(value));
      });
    }
  });

  it('should update input value on change', () => {
    render(<MockSearchBar />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Castellón' } });

    expect((input as HTMLInputElement).value).toBe('Castellón');
  });

  it('should call handleSubmit on Enter key press', () => {
    render(<MockSearchBar />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Valencia' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const value = localStorage.getItem('city');
    expect(value).toBe('Valencia');
  });

  it('should call handleSubmit on search icon click', () => {
    render(<MockSearchBar />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Alicante' } });

    const searchIcon = document.querySelector('.pointer');
    if (searchIcon) {
      fireEvent.click(searchIcon);
    }

    const value = localStorage.getItem('city');
    expect(value).toBe('Alicante');
  });
});
