import React from "react";
import flag from "../../Assets/icons/png/flag.png"; 

const Flag = ({ position }) => {
  return (
    <img
      src={flag}
      alt="Flag"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: `${(position.row - 1) * 50}px`,
        left: `${(position.col - 1) * 50}px`,
        zIndex: 1,
      }}
    ></img>
  );
};

export default Flag;
