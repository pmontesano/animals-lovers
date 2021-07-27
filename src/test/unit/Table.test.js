import React from 'react';
import { create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '../../components/Table';

configure({ adapter: new Adapter() });

const handleButtonRemove = jest.fn();

const props = {
  users: [],
  photo: 'photo.svg',
  thElements: [],
  handleUserClick: handleButtonRemove,
};

describe('Table', () => {
  it('should render correctly', () => {
    const wrapper = create(<Table {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
