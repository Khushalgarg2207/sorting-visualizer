import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the sorting visualizer component with its buttons', () => {
  render(<App />);
  
  const mergeSortButton = screen.getByText(/merge sort/i);
  
  expect(mergeSortButton).toBeInTheDocument();
});