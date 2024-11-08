import React from "react";
import portal2 from "../../Assets/icons/png/portal2.png";

const Portal2 = ({position}) => {
    return (
      <img
        src={portal2}
        alt="P2"
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
export default Portal2;