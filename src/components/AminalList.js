import Card from './Card';

const AnimalList = ({ animals, handleClick }) => {
  const handleOnClick = (id) => (e) => {
    handleClick(id);
  };

  return (
    <div>
      <ul className="flex flex-wrap -mx-2">
        {animals.map((animal) => (
          <li
            className="list-animals w-full sm:w1/2 md:w-1/4 px-2 my-6"
            key={animal.id}
          >
            <Card
              title={`Users for ${animal.name}`}
              action="See details"
              handleClick={handleOnClick(animal.id)}
              photo={animal.photo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalList;
