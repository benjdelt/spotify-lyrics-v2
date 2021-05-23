import { render, cleanup } from '@testing-library/react';
import Song from '../Song';
import { emptySong } from '../../utils/';


afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Song song={emptySong} />) 
  expect(asFragment(<Song song={emptySong} />)).toMatchSnapshot()
});
