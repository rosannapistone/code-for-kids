import React from "react";
import robot from "../../Assets/icons/png/robot.png"; 
import robotKey from "../../Assets/icons/png/robotKey.png";

const Robot = ({ position, withKey }) => {
  return withKey ? (
    <img
      src={robotKey}
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
    ></img>
  ) : (
    <img
      src={robot}
      alt="Robot"
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

export default Robot;
