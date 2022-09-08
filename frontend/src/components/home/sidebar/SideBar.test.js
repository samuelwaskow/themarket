import { render, screen } from '@testing-library/react';
import SideBar from './SideBar';

test('Should render it self', () => {

  render(<SideBar />);
  const logoElement = screen.getByRole('img');
  expect(logoElement).toBeInTheDocument();
});