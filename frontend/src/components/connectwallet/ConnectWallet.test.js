import { render, screen } from '@testing-library/react';
import ConnectWallet from './ConnectWallet';

test('Should display the connect your wallet button', () => {
  render(<ConnectWallet />);
  const linkElement = screen.getByText(/Connect Your Wallet/i);
  expect(linkElement).toBeInTheDocument();
});
