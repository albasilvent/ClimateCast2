import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './Header';
import i18n from '../../../../i18n';

const scrollToTopMock = vi.fn();
const { language } = i18n;

function MockHeader() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={`/${language}`} />} />
          <Route
            path="/:lang"
            element={<Header scrollToTop={scrollToTopMock} />}
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

describe('Header', () => {
  afterEach(() => {
    scrollToTopMock.mockClear();
  });

  it('should render Header correctly', () => {
    render(<MockHeader />);

    expect(screen.getByText('Climate'));
    expect(screen.getByText('CAST'));
  });

  it('should call scrollToTop on button click', () => {
    render(<MockHeader />);

    fireEvent.click(screen.getByText('Climate'));
    expect(scrollToTopMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('CAST'));
    expect(scrollToTopMock).toHaveBeenCalled();
  });
});
