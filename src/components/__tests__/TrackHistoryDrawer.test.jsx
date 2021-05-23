import { render, cleanup } from '@testing-library/react';
import { TrackHistoryDrawer } from '../TrackHistoryDrawer';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<TrackHistoryDrawer />)
  expect(asFragment(<TrackHistoryDrawer />)).toMatchSnapshot()
});
