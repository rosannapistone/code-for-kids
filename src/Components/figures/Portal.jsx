import React from "react";
import portal1 from "../../Assets/icons/png/portal1.png"; 

const Portal = ({position}) => {
  return (
    <img
      src={portal1}
      alt="P1"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: `${(position.row - 1) * 50}px`,
        left: `${(position.col - 1) * 50}px`,
        zIndex: 1,
      }}
    ></img>
  )
};

export default Portal;
