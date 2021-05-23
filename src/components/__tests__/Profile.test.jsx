import { render, cleanup } from '@testing-library/react';
import Profile from '../Profile';
import { emptyUser } from '../../utils/';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Profile user={emptyUser} />)
  expect(asFragment(<Profile user={emptyUser} />)).toMatchSnapshot()
});
