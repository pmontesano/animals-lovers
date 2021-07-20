import bearImage from '../assets/icons/bear.svg';
import catImage from '../assets/icons/cat.svg';
import dogImage from '../assets/icons/dog.svg';
import elephantImage from '../assets/icons/elephant.svg';
import gorillaImage from '../assets/icons/gorilla.svg';
import horseImage from '../assets/icons/horse.svg';
import jaguarImage from '../assets/icons/jaguar.svg';
import kangarooImage from '../assets/icons/kangaroo.svg';
import koalaImage from '../assets/icons/koala.svg';
import lionImage from '../assets/icons/lion.svg';
import monkeyImage from '../assets/icons/monkey.svg';
import pandaImage from '../assets/icons/panda.svg';
import penguinImage from '../assets/icons/penguin.svg';
import tigerImage from '../assets/icons/tiger.svg';
import zebraImage from '../assets/icons/zebra.svg';

const USE_FRIENDLY_USER_IDS = false;

const friendlyUserId = (user) =>
  (user.id + '-' + user.name.given + '-' + user.name.surname).toLowerCase();

const transformUserId = USE_FRIENDLY_USER_IDS ? friendlyUserId : ({ id }) => id;

export const transformUser = ({
  id,
  name,
  points,
  animals,
  isActive,
  age,
}) => ({
  id: transformUserId({ id, name }),
  firstName: name.given,
  lastName: name.surname,
  points,
  animals,
  isActive,
  age,
});

export const transformData = (data) => {
  return data
    .filter((user) => user.isActive) // Filter inactive users
    .reduce(
      (acc, user) => {
        const animals = user.animals.reduce((accAnimals, currAnimal) => {
          const currAnimalState = accAnimals[currAnimal];
          return {
            ...accAnimals,
            [currAnimal]: {
              id: currAnimal,
              name: currAnimal,
              photo: getAnimalPhoto(currAnimal),
              acumulatedPoints:
                (currAnimalState ? currAnimalState.acumulatedPoints : 0) +
                user.points,
              users: [
                ...(currAnimalState ? currAnimalState.users : []),
                transformUserId(user),
              ],
            },
          };
        }, acc.animals);

        return {
          users: {
            ...acc.users,
            [transformUserId(user)]: {
              ...transformUser(user),
            },
          },
          animals,
        };
      },
      {
        users: {},
        animals: {},
      }
    );
};

export const sortUsersByPointsDesc = (a, b) => b.points - a.points;

export const sortAnimalByAlphaAsc = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
};

export const userDataResumed = ({
  id,
  firstName,
  lastName,
  points,
  age,
  animals,
}) => ({
  id,
  firstName,
  lastName,
  points,
  age,
  animals,
});

export const animalDataResumed = ({ id, name, photo }) => ({
  id,
  name,
  photo,
});

export const getAnimalUsersByAnimalIdFromState = (
  state,
  animalId,
  sortFunc,
  max = 10
) => {
  if (!state.animals.hasOwnProperty(animalId)) return [];
  return state.animals[animalId].users
    .map((userId) => {
      if (state.users[userId] !== undefined) {
        return userDataResumed(state.users[userId]);
      }
    })
    .sort(sortFunc)
    .slice(0, max);
};

export const getUserAnimalsByUserIdFromState = (
  state,
  userId,
  sortFunc,
  max = 10
) => {
  if (!state.users.hasOwnProperty(userId)) return [];
  return state.users[userId].animals
    .map((animalId) => animalDataResumed(state.animals[animalId]))
    .sort(sortFunc)
    .slice(0, max);
};

export const getAnimalListFromState = (state) => {
  return Object.entries(state.animals).map(([_, animal]) => {
    return animalDataResumed(animal);
  });
};

const getAnimalPhoto = (id) => {
  const animalsPhoto = [
    { id: 'bear', url: bearImage },
    { id: 'cat', url: catImage },
    { id: 'dog', url: dogImage },
    { id: 'elephant', url: elephantImage },
    { id: 'gorilla', url: gorillaImage },
    { id: 'horse', url: horseImage },
    { id: 'jaguar', url: jaguarImage },
    { id: 'kangaroo', url: kangarooImage },
    { id: 'koala', url: koalaImage },
    { id: 'lion', url: lionImage },
    { id: 'monkey', url: monkeyImage },
    { id: 'panda', url: pandaImage },
    { id: 'penguin', url: penguinImage },
    { id: 'tiger', url: tigerImage },
    { id: 'zebra', url: zebraImage },
  ];

  const photo = animalsPhoto
    .filter((animal) => animal.id === id)
    .map((element) => element.url);

  return photo.toString();
};
