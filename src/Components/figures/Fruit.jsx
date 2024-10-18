// Fruit.js
import React from "react";
import apple from "../../Assets/icons/png/apple.png";
import appleEaten from "../../Assets/icons/png/apple_eaten.png";

const Fruit = ({ position, eaten }) => {
  return eaten ? (
    <img
      src={appleEaten}
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
      src={apple}
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

export default Fruit;
