import React from 'react';
import { create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AnimalList from '../../components/AminalList';
import Card from '../../components/Card';

configure({ adapter: new Adapter() });

const props = {
  animals: [{ id: '1234', name: 'Bear', photo: 'bear.svg' }],
  handleClick: jest.fn,
};

describe('AnimalsList', () => {
  it('should render correctly', () => {
    const wrapper = create(<AnimalList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render card component inside', () => {
    const wrapper = shallow(<AnimalList {...props} />);

    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
