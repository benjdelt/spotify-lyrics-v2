import { render, cleanup } from '@testing-library/react';
import Error from '../Error';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Error />)
  expect(asFragment(<Error />)).toMatchSnapshot()
});
