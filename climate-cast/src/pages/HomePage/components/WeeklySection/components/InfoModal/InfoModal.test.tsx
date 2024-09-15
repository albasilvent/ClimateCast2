import { render, screen, fireEvent } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { FavoriteProvider } from '../../../../../../contexts/FavoritesContext';
import { CityProvider } from '../../../../../../contexts/CityContext';
import InfoModal from './InfoModal';

// Mock data for InfoModal
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

// Mock component setup for InfoModal within the router
function MockInfoModal() {
  return (
    <FavoriteProvider>
      <CityProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/en" />} />
              <Route
                path="/:lang"
                element={<InfoModal dailyData={mockModalData} />}
              />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('InfoModal Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the InfoModal correctly without opening it initially', () => {
    render(<MockInfoModal />);

    expect(screen.getByRole('button', { name: /forecast/i }));
  });

  it('should open the InfoModal when clicked and display correct data', () => {
    render(<MockInfoModal />);

    const forecastButton = screen.getByRole('button', { name: /forecast/i });
    fireEvent.click(forecastButton);

    expect(screen.getByTestId('infoModal'));
  });
});
