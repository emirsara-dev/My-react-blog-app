import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Create from './Create';
import '@testing-library/jest-dom';

describe('Create component', () => {

  beforeEach(() => {
    // Mock fetch to prevent real network requests
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to home after submitting the form', async () => {
    const history = createMemoryHistory();
    history.push('/create'); // start at /create

    render(
      <Router history={history}>
        <Create />
      </Router>
    );

    // Fill out form fields
    fireEvent.change(screen.getByLabelText(/blog title/i), { target: { value: 'My New Blog' } });
    fireEvent.change(screen.getByLabelText(/blog body/i), { target: { value: 'This is the body' } });

    // Click submit
    fireEvent.click(screen.getByRole("button", {name: /submit/i}));

    // Wait for redirect (fetch resolves then history.push('/'))
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});
