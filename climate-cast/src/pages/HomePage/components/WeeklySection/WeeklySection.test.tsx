import { render, screen } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { FavoriteProvider } from '../../../../contexts/FavoritesContext';
import { CityProvider } from '../../../../contexts/CityContext';
import WeeklySection from './WeeklySection';

const mockWeeklyData = [
  {
    dt: 1696099200,
    weather: [
      {
        main: 'Clear',
      },
    ],
    main: {
      temp_max: 30,
      temp_min: 20,
    },
  },
  {
    dt: 1696185600,
    weather: [
      {
        main: 'Clouds',
      },
    ],
    main: {
      temp_max: 28,
      temp_min: 19,
    },
  },
];

const mockModalData = [
  {
    dt: 1696099200,
    weather: [
      {
        main: 'Clear',
      },
    ],
    main: {
      temp: 30,
      feels_like: 29,
      humidity: 50,
      pressure: 1015,
    },
  },
  {
    dt: 1696185600,
    weather: [
      {
        main: 'Clouds',
      },
    ],
    main: {
      temp: 28,
      feels_like: 27,
      humidity: 60,
      pressure: 1010,
    },
  },
];

function MockWeeklySection() {
  return (
    <FavoriteProvider>
      <CityProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/en" />} />
              <Route
                path="/:lang"
                element={
                  <WeeklySection
                    weeklyData={mockWeeklyData}
                    modalData={mockModalData}
                  />
                }
              />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('WeeklySection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render WeeklySection correctly', () => {
    render(<MockWeeklySection />);

    expect(screen.getAllByText('Forecast'));
  });
});
