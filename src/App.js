import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/styles/main.css';
import './assets/styles/app.scss';
import Header from './components/Header';
import AnimalList from './components/AminalList';
import UsersList from './components/UsersList';
import Loading from './components/Loading';

import {
  transformData,
  getAnimalListFromState,
  getAnimalUsersByAnimalIdFromState,
  sortUsersByPointsDesc,
  sortAnimalByAlphaAsc,
} from './utils/transformData';

const initialState = {
  route: 'animalList',
  data: {
    users: {},
    animals: {},
  },
};

function App() {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const { route } = state;

  const fetchData = async () => {
    return await axios.get('users.json');
  };

  useEffect(() => {
    fetchData().then((res) => {
      setState({ ...state, data: transformData(res.data) });
      setIsLoading(false);
    });
  }, []);

  const animalsArray = getAnimalListFromState(state.data).sort(
    sortAnimalByAlphaAsc
  );

  const usersFromAnimalsArray = getAnimalUsersByAnimalIdFromState(
    state.data,
    state.animalSelected,
    sortUsersByPointsDesc,
    state.userLimit
  );

  const animalSelect = (id) => {
    setState({
      ...state,
      route: 'usersList',
      animalSelected: id,
      userLimit: 10,
    });
  };

  const removeUserClick = (id) => {
    const newUsersState = Object.entries(state.data.users).filter(
      ([_, user]) => user.id !== id
    );

    const transformUserState = Object.fromEntries(newUsersState);

    setState({
      ...state,
      data: {
        ...state.data,
        animals: state.data.animals,
        users: transformUserState,
      },
    });
  };

  const showMoreUsers = (limit) => {
    setState({
      ...state,
      userLimit: limit,
      fullList: true,
    });
  };

  return (
    <div className="app">
      <main className="bg-gray-100">
        <Header />
        {isLoading ? (
          <Loading className="loading-wrapper" />
        ) : (
          <div className="container" data-testid="resolved">
            {route === 'animalList' && (
              <AnimalList animals={animalsArray} handleClick={animalSelect} />
            )}
            {route === 'usersList' && (
              <UsersList
                animalName={state.animalSelected}
                users={usersFromAnimalsArray}
                fullList={state.fullList}
                handleClick={showMoreUsers}
                handleRemoveUserClick={removeUserClick}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
