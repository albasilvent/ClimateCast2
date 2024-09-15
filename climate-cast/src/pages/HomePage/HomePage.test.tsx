import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { FavoriteProvider } from '../../contexts/FavoritesContext';
import { CityProvider } from '../../contexts/CityContext';
import HomePage from './HomePage';
import WeatherContext from '../../contexts/WeatherContext';

// Mock HomePage with necessary providers
function MockHomePage() {
  return (
    <FavoriteProvider>
      <CityProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/en" />} />
              <Route path="/:lang" element={<HomePage />} />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the HomePage', async () => {
    // Mock context with loading state
    const mockContextValue = {
      infoData: {},
      dailyData: [],
      weeklyData: [],
      modalData: [],
      hasError: false,
      isDataReady: false,
      loading: false,
      titleCity: '',
      setCity: vi.fn(), // Mock setCity function
    };

    render(
      <WeatherContext.Provider value={mockContextValue}>
        <MockHomePage />
      </WeatherContext.Provider>
    );

    expect(screen.getByTestId('homePage'));
  });

  it('should allow typing in the search bar and trigger a search', async () => {
    // Mock context with ready state but no error
    const mockContextValue = {
      infoData: {},
      dailyData: [],
      weeklyData: [],
      modalData: [],
      hasError: false,
      isDataReady: true,
      loading: false,
      titleCity: '',
      setCity: vi.fn(),
    };

    render(
      <WeatherContext.Provider value={mockContextValue}>
        <MockHomePage />
      </WeatherContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText(
      'Search...'
    ) as HTMLInputElement;

    // Simulate typing in the search bar
    fireEvent.change(searchInput, { target: { value: 'ewqewqe' } });
    expect(searchInput.value).toBe('ewqewqe'); // Verify the input value

    const searchIcon = document.querySelector('.pointer');
    if (searchIcon) {
      fireEvent.click(searchIcon);
    }

    await waitFor(
      () => {
        expect(screen.getByTestId('homePage'));
      },
      { timeout: 5000 }
    );
  });
});
