import React from "react";
import key from "../../Assets/icons/png/key.png"; 

const Key = ({ position }) => {
  return (
    <img
      src={key}
      alt="Key"
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

export default Key;
