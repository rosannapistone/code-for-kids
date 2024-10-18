import React from "react";
import lampRed from "../../Assets/icons/png/lamp_red.png"; 
import lampBlue from "../../Assets/icons/png/lamp_blue.png"; 

const Lamp = ({ position, lit }) => {
  return lit ? (
    <img
      src={lampRed}
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
      src={lampBlue}
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

export default Lamp;