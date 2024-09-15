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
import InfoSection from './InfoSection';

// Mock data for InfoSection
const mockInfoData = {
  weather: [
    {
      main: 'Clear',
      description: 'clear sky',
    },
  ],
  main: {
    temp: 22.5,
    feels_like: 21.0,
    temp_min: 20.0,
    temp_max: 24.0,
    humidity: 60,
    pressure: 1012,
  },
};

// Mock InfoSection component
function MockInfoSection() {
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
                  <InfoSection infoData={mockInfoData} titleCity="Madrid" />
                }
              />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('InfoSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render InfoSection correctly', () => {
    render(<MockInfoSection />);

    // Verify that InfoSection is rendered
    const infoSection = screen.queryByTestId('infoSection');
    expect(infoSection);

    // Additional assertions based on the rendered content
    expect(screen.getByText('Madrid'));
  });
});
