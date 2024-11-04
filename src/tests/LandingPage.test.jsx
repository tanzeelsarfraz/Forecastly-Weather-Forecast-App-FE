import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../components/LandingPage'; 
jest.mock('axios');

test('renders greeting message', () => {
  render(<LandingPage />);
  
  const greetingElement = screen.getByText(/Forecastly!/i);
  expect(greetingElement).toBeInTheDocument();
});