import { render, cleanup, waitFor } from '@testing-library/react';
import App from '../App';

afterEach(cleanup)

it('should take a snapshot', async () => {
  await waitFor(() => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  })
});
