import React from 'react';

const Table = ({ users, photo, handleUserClick, thElements }) => {
  const handleButtonRemove = (id) => (e) => {
    handleUserClick(id);
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead className="table-thead">
          <tr>
            {thElements.map((elementTitle) => (
              <th className="table-th" key={elementTitle}>
                {elementTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-tbody">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="table-td">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        photo
                          ? photo
                          : 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      }
                      alt={user.firstName}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="table-td">
                <ul className="inline-list">
                  {user.animals.map((animal, i) => (
                    <li key={i} className="text-gray-400">
                      {' '}
                      {animal}{' '}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="table-td">
                <span className="text-sm text-yellow-500 text-lg">
                  {user.points}
                </span>
              </td>
              <td className="table-td text-right">
                <button
                  className="button-remove"
                  onClick={handleButtonRemove(user.id)}
                >
                  Delete user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
