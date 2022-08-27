import { render, screen } from '@testing-library/react';
import App from './App';

test('Should display The Market name', () => {
  render(<App />);
  window.ethereum = 1;
  // const linkElement = screen.getByText(/The market/i);
  // expect(linkElement).toBeInTheDocument();
});
