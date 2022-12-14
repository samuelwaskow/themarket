import { render, screen, cleanup } from '@testing-library/react';
import Notification from './Notification';

afterEach(cleanup)

test('Should not display a notification', () => {

    render(<Notification type='danger' />)
    let element = screen.queryByRole('alert') 
    expect(element).toBeNull()

});

test('Should display a danger notification', () => {

    render(<Notification type='danger' message='message test' />)
    let element = screen.getByText(/message test/i)
    expect(element).toBeInTheDocument()

    element = screen.getByRole('alert')
    // const styles = getComputedStyle(element)
    // expect(styles.color).toBe('red')

});

test('Should display a success notification', () => {

    render(<Notification type='success' message='message test' />)
    const element = screen.getByText(/message test/i)
    expect(element).toBeInTheDocument()
    

});