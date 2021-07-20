import React from 'react';
import { create } from 'react-test-renderer';
import { configure, mount, shallow } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
import App from '../../App';
import Loading from '../../components/Loading';

jest.mock('axios');

// mock data
const response = [
  {
    id: '5fbfe211d32e20623de48785',
    name: {
      given: 'Irma',
      surname: 'Mendez',
    },
    points: 28,
    animals: ['cat', 'horse', 'elephant', 'tiger', 'gorilla'],
    isActive: false,
    age: 20,
  },
];

const data = {
  route: 'animalList',
  data: response,
};

describe('App', () => {
  let wrapper;

  // clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should resolve with response data', async () => {
    // mock axios promise
    await act(async () => {
      await axios.get.mockImplementationOnce(() => Promise.resolve(data));
      wrapper = mount(<App />);
    });

    wrapper.update();

    await expect(axios.get).toHaveBeenCalledWith('users.json');
    await expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should render correctly', () => {
    wrapper = create(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
