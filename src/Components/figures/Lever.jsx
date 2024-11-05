// Lever.js
import React from "react";
import lever from "../../Assets/icons/png/lever.png";
import leverFlipped from "../../Assets/icons/png/leverflipped.png";

const Lever = ({ position, flipped }) => {
  
  return flipped ? (
    <img
      src={leverFlipped}
      alt="lever"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: `${(position.row - 1) * 50}px`,
        left: `${(position.col - 1) * 50}px`,
        zIndex: 1,
      }}
    ></img>
  ) : (
    <img
      src={lever}
      alt="Lever"
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

export default Lever;
