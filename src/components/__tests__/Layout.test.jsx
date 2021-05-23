import { render, cleanup } from '@testing-library/react';
import Layout from '../Layout';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Layout />)
  expect(asFragment(<Layout />)).toMatchSnapshot()
});
