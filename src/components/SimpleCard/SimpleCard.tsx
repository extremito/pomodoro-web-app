import React from "react";
import PropTypes from 'prop-types'

interface ISimpleCard {
  title: string;
  text: string;
}

const SimpleCard = ({ title, text }: ISimpleCard) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

SimpleCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default SimpleCard;
