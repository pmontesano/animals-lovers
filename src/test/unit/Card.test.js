import React from 'react';
import { create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Card from '../../components/Card';

configure({ adapter: new Adapter() });

const handleButtonClick = jest.fn();

const props = {
  photo: 'somephoto.svg',
  alt: 'photo alt',
  title: 'title',
  action: true,
  id: '1234',
  handleClick: handleButtonClick,
};

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = create(<Card {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should be call handleButtonClick', () => {
    const wrapper = shallow(<Card {...props} />);
    wrapper.find('button').at(0).simulate('click');
    expect(handleButtonClick.mock.calls.length).toEqual(1);
  });
});
