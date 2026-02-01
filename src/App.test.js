import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Open Ryu', () => {
  render(<App />);
  const heading = screen.getByText(/open ryu/i);
  expect(heading).toBeInTheDocument();
});
