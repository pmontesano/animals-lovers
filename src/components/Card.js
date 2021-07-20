import React from 'react';

const Card = ({ photo, alt, title, action, handleClick, id }) => {
  const handleButtonClick = (id) => (e) => {
    handleClick(id);
  };

  return (
    <div className="card">
      <div className="card-photo">
        <img className="mx-auto" src={photo} alt={alt} />
      </div>

      <div className="px-6 py-4">
        <div className={`${title ? 'font-bold text-xl mb-2' : 'skeleton-box'}`}>
          {title}
        </div>
      </div>
      <div className="px-6 py-4">
        {action && (
          <button
            className="btn btn-blue btn-blue:hover"
            onClick={handleButtonClick(id)}
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
