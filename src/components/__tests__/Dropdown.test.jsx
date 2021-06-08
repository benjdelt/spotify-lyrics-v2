import { render, cleanup } from '@testing-library/react';
import { Dropdown, DropdownMenuItem } from '../Dropdown';

afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<DropdownMenuItem />) 
  expect(asFragment(<DropdownMenuItem />)).toMatchSnapshot()
});

it('should take a snapshot', () => {
  const { asFragment } = render(<Dropdown />) 
  expect(asFragment(<Dropdown />)).toMatchSnapshot()
});
