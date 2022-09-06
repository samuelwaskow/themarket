import { render, screen } from '@testing-library/react';
import TopBar from './TopBar';

test('Should render it self', () => {

  render(<TopBar />);
  const logoElement = screen.getByRole('img');
  expect(logoElement).toBeInTheDocument();
});