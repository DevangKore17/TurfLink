import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Home from './Home';
import { ThemeProvider } from '../context/ThemeContext';

describe('Home Component', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders the hello message', () => {
    renderHome();
    expect(screen.getByText(/Hello, Surya/i)).toBeInTheDocument();
  });

  it('renders the search input', () => {
    renderHome();
    const searchInput = screen.getByPlaceholderText(/Search for sports, turfs, matches.../i);
    expect(searchInput).toBeInTheDocument();
  });

  it('updates search query on typing', () => {
    renderHome();
    const searchInput = screen.getByPlaceholderText(/Search for sports, turfs, matches.../i);
    fireEvent.change(searchInput, { target: { value: 'Football' } });
    expect(searchInput.value).toBe('Football');
  });

  it('renders popular categories', () => {
    renderHome();
    expect(screen.getByText(/Popular Categories/i)).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});
