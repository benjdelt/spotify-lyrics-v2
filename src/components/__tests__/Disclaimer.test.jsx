import { render, cleanup } from '@testing-library/react';
import Disclaimer from '../Disclaimer';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Disclaimer />) 
  expect(asFragment(<Disclaimer />)).toMatchSnapshot()
});
