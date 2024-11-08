import React from "react";
import chest from "../../Assets/icons/png/chest.png"; 
import chestOpen from "../../Assets/icons/png/chestOpen.png"; 


const Chest = ({ position, open }) => {
  return open ? (
    <img
      src={chestOpen}
      alt="ChestOpen"
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
  ) : (    <img
    src={chest}
    alt="Chest"
    style={{
      width: "50px",
      height: "50px",
      position: "absolute",
      top: `${(position.row - 1) * 50}px`,
      left: `${(position.col - 1) * 50}px`,
      zIndex: 1,
      transition: "top 0.5s ease, left 0.5s ease", 
    }}
  ></img>
  );
};

export default Chest;
