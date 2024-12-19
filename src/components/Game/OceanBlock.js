import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  isShip: PropTypes.bool.isRequired,
  displayShips: PropTypes.bool.isRequired,
  isAttacked: PropTypes.bool.isRequired,
  fire: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  display: PropTypes.string.isRequired,
};

const OceanBlock = ({
  isShip,
  displayShips,
  isAttacked,
  fire,
  index,
  display,
}) => {
  const release = () => fire(index);
  return (
    <>
      <div
        className={`ocean-block ${isShip && displayShips ? `red` : ``} 
        ${isAttacked ? `darkgrey` : ``}`}
        onClick={release}
      >
        {`${display}`}
      </div>
    </>
  );
};

OceanBlock.propTypes = propTypes;

export { OceanBlock as OceonShipBlock };
