import Table from './Table';

const UsersList = ({
  animalName,
  users,
  handleClick,
  handleRemoveUserClick,
  fullList,
}) => {
  const limit = 25;

  const handleUserClick = (id) => {
    handleRemoveUserClick(id);
  };

  const handleShowMoreClick = (limit) => (e) => {
    handleClick(limit);
  };

  const title = animalName.toUpperCase() + ' USERS';

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h2 className="font-medium text-2xl py-6">{title}</h2>
      <Table
        users={users}
        handleUserClick={handleUserClick}
        thElements={['Name', 'Animal List', 'Point', 'Actions']}
      />
      {!fullList && (
        <div className="text-center py-8">
          <button
            className="btn btn-blue btn-blue:hover"
            onClick={handleShowMoreClick(limit)}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
