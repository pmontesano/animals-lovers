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
    <>
      <h2 className="title">{title}</h2>
      <Table
        users={users}
        handleUserClick={handleUserClick}
        thElements={['Name', 'Animal List', 'Point', 'Actions']}
      />
      {!fullList && (
        <div className="actions-row">
          <button className="button" onClick={handleShowMoreClick(limit)}>
            Show more
          </button>
        </div>
      )}
    </>
  );
};

export default UsersList;
