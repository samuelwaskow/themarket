import { render, screen, cleanup } from '@testing-library/react';
import Loading from './Loading';

afterEach(cleanup)

test('Should render a loading message', () => {

    render(<Loading/>)
    let element = screen.getByRole('status')
    expect(element).toBeInTheDocument()

});