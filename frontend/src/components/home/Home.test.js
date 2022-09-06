import { render, screen } from '@testing-library/react';
import Home from './Home';

test('Should display the wallet address', () => {
  render(<Home address="0x986726152" />);
  const linkElement = screen.getByText(/0x986726152/i);
  expect(linkElement).toBeInTheDocument();
});