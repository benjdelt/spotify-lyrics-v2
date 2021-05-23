import { render, cleanup } from '@testing-library/react';
import Loader from '../Loader';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Loader />)
  expect(asFragment(<Loader />)).toMatchSnapshot()
});
