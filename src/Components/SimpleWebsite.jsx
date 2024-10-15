import React, { useState } from "react";
import "./simple-website.scss"; // You'll need to create a CSS file for initial styles

const SimpleWebsite = () => {
  const [headerStyle, setHeaderStyle] = useState({});
  const [menuStyle, setMenuStyle] = useState({});
  const [contentStyle, setContentStyle] = useState({});
  const [buttonStyle, setButtonStyle] = useState({});

  // Handle drag event and store the style property
  const handleDragStart = (e, styleProperty) => {
    e.dataTransfer.setData("style", styleProperty);
  };

  // Allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event to apply the dragged style
  const handleDrop = (e, target) => {
    const style = e.dataTransfer.getData("style");

    switch (target) {
      case "header":
        setHeaderStyle({ ...headerStyle, ...JSON.parse(style) });
        break;
      case "menu":
        setMenuStyle({ ...menuStyle, ...JSON.parse(style) });
        break;
      case "content":
        setContentStyle({ ...contentStyle, ...JSON.parse(style) });
        break;
      case "button":
        setButtonStyle({ ...buttonStyle, ...JSON.parse(style) });
        break;
      default:
        break;
    }
  };

  return (
    <div className="website-container">
      {/* Header */}
      <header
        className="header"
        onDrop={(e) => handleDrop(e, "header")}
        onDragOver={handleDragOver}
        style={headerStyle}
      >
        <img
          src="https://via.placeholder.com/100x50"
          alt="Logo"
          className="logo"
        />
        <nav
          className="menu"
          onDrop={(e) => handleDrop(e, "menu")}
          onDragOver={handleDragOver}
          style={menuStyle}
        >
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main
        className="main-content"
        onDrop={(e) => handleDrop(e, "content")}
        onDragOver={handleDragOver}
        style={contentStyle}
      >
        <h1>Welcome to Our Simple Website</h1>
        <p>Drag and drop styles onto the elements to customize this page!</p>
        <button
          className="main-button"
          onDrop={(e) => handleDrop(e, "button")}
          onDragOver={handleDragOver}
          style={buttonStyle}
        >
          Click Me
        </button>
      </main>

      {/* Style Options */}
      <div className="style-options">
        <h2>Drag these styles:</h2>

        {/* Style Option: Background Color */}
        <div
          className="style-option"
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(
              e,
              JSON.stringify({ backgroundColor: "lightblue" })
            )
          }
        >
          Background: Light Blue
        </div>

        {/* Style Option: Font Size */}
        <div
          className="style-option"
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(e, JSON.stringify({ fontSize: "24px" }))
          }
        >
          Font Size: 24px
        </div>

        {/* Style Option: Font Color */}
        <div
          className="style-option"
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(e, JSON.stringify({ color: "green" }))
          }
        >
          Font Color: Green
        </div>

        {/* Style Option: Border */}
        <div
          className="style-option"
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(e, JSON.stringify({ border: "2px solid red" }))
          }
        >
          Border: 2px Solid Red
        </div>
      </div>
    </div>
  );
};

export default SimpleWebsite;


