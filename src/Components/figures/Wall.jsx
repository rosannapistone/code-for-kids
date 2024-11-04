import React from "react";
import wall from "../../Assets/icons/png/wall.png"; 

const Wall = ({ position }) => {
  return (
    <img
      src={wall}
      alt="Wall"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: `${(position.row - 1) * 50}px`,
        left: `${(position.col - 1) * 50}px`,
        zIndex: 1,
        transition: "top 0.5s ease, left 0.5s ease", 
      }}
    />
  );
};

export default Wall;
