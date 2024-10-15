import React, { useState } from "react";

const DragAndDrop = () => {
  const [commands, setCommands] = useState([]);
  const [figurePosition, setFigurePosition] = useState({ top: 180, left: 50 });

  // Command event handler to drag
  const handleDragStart = (e, direction) => {
    e.dataTransfer.setData("direction", direction);
  };

  // Allow drop by preventing the default behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const direction = e.dataTransfer.getData("direction");
    setCommands((prevCommands) => [...prevCommands, direction]);
  };

  // Function to move the figure based on the commands
  const moveFigure = () => {
    let { top, left } = figurePosition;

    commands.forEach((command) => {
      switch (command) {
        case "up":
          top -= 50;
          break;
        case "down":
          top += 50;
          break;
        case "left":
          left -= 50;
          break;
        case "right":
          left += 50;
          break;
        default:
          break;
      }
    });

    // Update figure's position
    setFigurePosition({ top, left });

    // Check if the figure has reached the goal
    checkGoal(top, left);

    // Clear commands after execution
    setCommands([]);
  };

  // Check if the figure has reached the goal
  const checkGoal = (top, left) => {
    const goal = { top: 50, left: 500, width: 50, height: 50 };
    if (
      left < goal.left + goal.width &&
      left + 40 > goal.left &&
      top < goal.top + goal.height &&
      top + 40 > goal.top
    ) {
      alert("You reached the goal!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Drag and Drop Game</h1>
      {/* Game Area */}
      <div
        id="game-container"
        style={{
          width: "600px",
          height: "400px",
          position: "relative",
          border: "2px solid black",
          backgroundColor: "#f0f0f0",
          margin: "0 auto",
        }}
      >
        {/* SVG Figure (Circle) */}
        <svg
          id="figure"
          style={{
            width: "40px",
            height: "40px",
            fill: "blue",
            position: "absolute",
            top: `${figurePosition.top}px`,
            left: `${figurePosition.left}px`,
          }}
        >
          <circle cx="20" cy="20" r="20" />
        </svg>

        {/* Goal */}
        <svg
          id="goal"
          style={{
            width: "50px",
            height: "50px",
            fill: "green",
            position: "absolute",
            top: "50px",
            left: "500px",
          }}
        >
          <rect width="50" height="50" />
        </svg>
      </div>

      {/* Command options for movement */}
      <div id="command-container" style={{ marginTop: "20px" }}>
        <div
          className="command"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "up")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-block",
            width: "100px",
            cursor: "pointer",
          }}
        >
          Move Up
        </div>
        <div
          className="command"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "down")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-block",
            width: "100px",
            cursor: "pointer",
          }}
        >
          Move Down
        </div>
        <div
          className="command"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "left")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-block",
            width: "100px",
            cursor: "pointer",
          }}
        >
          Move Left
        </div>
        <div
          className="command"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "right")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-block",
            width: "100px",
            cursor: "pointer",
          }}
        >
          Move Right
        </div>
      </div>

      {/* Drop Zone */}
      <div
        id="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          minHeight: "100px",
          width: "300px",
          margin: "20px auto",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        {commands.length === 0
          ? "Drop commands here"
          : commands.map((command, index) => (
              <div key={index}>Move {command}</div>
            ))}
      </div>

      {/* Execute Button */}
      <button
        onClick={moveFigure}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Execute Commands
      </button>
    </div>
  );
};

export default DragAndDrop;

