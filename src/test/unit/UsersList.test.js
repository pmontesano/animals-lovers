import React from 'react';
import { create } from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UsersList from '../../components/UsersList';
import Table from '../../components/Table';
import shallow from 'enzyme/build/shallow';

configure({ adapter: new Adapter() });

const handleClickButton = jest.fn();
const handleShowMoreClick = jest.fn();

const props = {
  animalName: 'Bear',
  users: [
    {
      age: 33,
      animals: [],
      firstName: 'Stefanie',
      id: '5fbfe2a4aecbbb9031030578',
      lastName: 'Bond',
      points: 100,
    },
  ],
  handleRemoveUserClick: handleClickButton,
  fullList: false,
  handleClick: handleShowMoreClick,
};

describe('UsersList', () => {
  it('should render correctly', () => {
    const wrapper = create(<UsersList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render Table component inside', () => {
    const wrapper = shallow(<UsersList {...props} />);

    expect(wrapper.find(Table)).toHaveLength(1);
  });

  it('should click handleShowMoreClick', () => {
    const wrapper = shallow(<UsersList {...props} />);

    // is the limit of users's list when the handleShowMoreClick is clicked
    const maxLimit = 25;

    wrapper.find('button').simulate('click');
    expect(handleShowMoreClick.mock.calls).toEqual([[maxLimit]]);
  });
});
