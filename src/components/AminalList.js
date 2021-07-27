import Card from './Card';

const AnimalList = ({ animals, handleClick }) => {
  const handleOnClick = (id) => (e) => {
    handleClick(id);
  };

  return (
    <div>
      <ul className="animals-list">
        {animals.map((animal) => (
          <li className="animals-list-li sm:w1/2 md:w-1/4" key={animal.id}>
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
