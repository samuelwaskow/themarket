import { render, screen } from '@testing-library/react';
import NoWalletDetected from './NoWalletDetected';

test('Should display there is no wallet detected', () => {
  render(<NoWalletDetected />);
  const linkElement = screen.getByText(/No Ethereum wallet was detected/i);
  expect(linkElement).toBeInTheDocument();
});