import { render, cleanup } from '@testing-library/react';
import { TrackHistoryDrawer, DrawerMenuItem } from '../TrackHistoryDrawer';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<DrawerMenuItem />)
  expect(asFragment(<DrawerMenuItem />)).toMatchSnapshot()
});

it('should take a snapshot', () => {
  const { asFragment } = render(<TrackHistoryDrawer />)
  expect(asFragment(<TrackHistoryDrawer />)).toMatchSnapshot()
});
