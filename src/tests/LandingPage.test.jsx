import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../components/LandingPage'; // Adjust the path if necessary

// Mocking the axios module
jest.mock('axios');

test('renders greeting message', () => {
  render(<LandingPage />);
  
  const greetingElement = screen.getByText(/Forecastly!/i);
  expect(greetingElement).toBeInTheDocument();
});