import { render, screen } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import DailySection from './DailySection';
import { FavoriteProvider } from '../../../../contexts/FavoritesContext';
import { CityProvider } from '../../../../contexts/CityContext';

const mockDailyData = [
  {
    dt: 1694884800, // Unix timestamp for a specific date/time
    weather: [
      {
        main: 'Clear', // Weather condition
      },
    ],
    main: {
      temp: 22.5, // Temperature in Celsius
    },
  },
  {
    dt: 1694971200, // Unix timestamp for another date/time
    weather: [
      {
        main: 'Clouds', // Weather condition
      },
    ],
    main: {
      temp: 19.0, // Temperature in Celsius
    },
  },
  {
    dt: 1695057600, // Unix timestamp for another date/time
    weather: [
      {
        main: 'Rain', // Weather condition
      },
    ],
    main: {
      temp: 17.3, // Temperature in Celsius
    },
  },
  {
    dt: 1695144000, // Unix timestamp for another date/time
    weather: [
      {
        main: 'Snow', // Weather condition
      },
    ],
    main: {
      temp: 0.0, // Temperature in Celsius
    },
  },
  {
    dt: 1695230400, // Unix timestamp for another date/time
    weather: [
      {
        main: 'Thunderstorm', // Weather condition
      },
    ],
    main: {
      temp: 15.0, // Temperature in Celsius
    },
  },
];

function MockDailySection() {
  return (
    <FavoriteProvider>
      <CityProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="en" />} />
              <Route
                path="/:lang"
                element={<DailySection dailyData={mockDailyData} />}
              />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('DailySection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render DailySection correctly ', () => {
    render(<MockDailySection />);
    expect(screen.getByTestId('dailySection'));
  });
});
