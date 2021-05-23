import { render, cleanup } from '@testing-library/react';
import { Dropdown } from '../Dropdown';


afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<Dropdown />) 
  expect(asFragment(<Dropdown />)).toMatchSnapshot()
});
