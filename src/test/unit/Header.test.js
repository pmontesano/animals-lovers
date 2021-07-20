import React from 'react';
import { create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Header from '../../components/Header';

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render correctly', () => {
    const wrapper = create(<Header />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should be has logo', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
  });
});
