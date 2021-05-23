import { render, cleanup } from '@testing-library/react';
import Nav from '../Nav';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Nav />)
  expect(asFragment(<Nav />)).toMatchSnapshot()
});
