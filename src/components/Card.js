import React from 'react';

const Card = ({ photo, alt, title, action, handleClick, id }) => {
  const handleButtonClick = (id) => (e) => {
    handleClick(id);
  };

  return (
    <div className="card">
      <div className="card-photo">
        <img src={photo} alt={alt} />
      </div>

      <div className="card-row">
        <div className="card-title">{title}</div>
      </div>
      <div className="card-row">
        {action && (
          <button className="button" onClick={handleButtonClick(id)}>
            {action}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
