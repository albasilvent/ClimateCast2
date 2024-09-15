import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { FavoriteProvider } from '../../../../../../contexts/FavoritesContext';
import { CityProvider } from '../../../../../../contexts/CityContext';
import ContactUsModal from './ContactUsModal';

function MockContactUsModal() {
  return (
    <FavoriteProvider>
      <CityProvider>
        <MantineProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/en" />} />
              <Route path="/:lang" element={<ContactUsModal />} />
            </Routes>
          </Router>
        </MantineProvider>
      </CityProvider>
    </FavoriteProvider>
  );
}

describe('ContactUsModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the ContactUsModal and open it when the contact button is clicked', async () => {
    render(<MockContactUsModal />);

    const contactButton = screen.getByRole('button', { name: /contact us/i });
    fireEvent.click(contactButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog'));
    });
  });

  it('should submit successfully', async () => {
    render(<MockContactUsModal />);

    const contactButton = screen.getByRole('button', { name: /contact us/i });
    fireEvent.click(contactButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog'));
    });

    fireEvent.change(screen.getByTestId('name'), { target: { value: 'Alba' } });
    fireEvent.change(screen.getByTestId('surname'), {
      target: { value: 'Silvent' },
    });
    fireEvent.change(screen.getByTestId('birthdate'), {
      target: { value: '07/10/2002' },
    });
    fireEvent.change(screen.getByTestId('city'), {
      target: { value: 'Castellón' },
    });
    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'albasilvent@gmail.com' },
    });
    fireEvent.change(screen.getByTestId('phone'), {
      target: { value: '627843643' },
    });

    const submitButton = screen.getByTestId('submitFormButton');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('formLoader'));
    });

    await waitFor(
      () => {
        expect(screen.getByTestId('notification'));
      },
      { timeout: 5000 }
    );
  });

  it('should show validation errors when inputs have incorrect formats', async () => {
    render(<MockContactUsModal />);

    const contactButton = screen.getByRole('button', { name: /contact us/i });
    fireEvent.click(contactButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog'));
    });

    const surnameInput = screen.getByTestId('surname') as HTMLInputElement;

    // Set an incorrect value for the surname field
    fireEvent.change(surnameInput, { target: { value: '123' } });

    // Submit the form
    const submitButton = screen.getByTestId('submitFormButton');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('This field is required'));
      expect(screen.getAllByText('Invalid format'));
    });
  });
});
