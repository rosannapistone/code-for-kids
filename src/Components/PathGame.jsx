import React, { useState } from "react";

const PathGame = () => {
  const [commands, setCommands] = useState([]);
  const [figurePosition, setFigurePosition] = useState({ top: 180, left: 50 });
  const [lampLit, setLampLit] = useState(false);
  const [fruitEaten, setFruitEaten] = useState(false);

  // Lamp, Fruit, and Goal positions
  const lampPosition = { top: 100, left: 200 };
  const fruitPosition = { top: 250, left: 400 };
  const goalPosition = { top: 50, left: 500 };

  // Command event handler to drag
  const handleDragStart = (e, command) => {
    e.dataTransfer.setData("command", command);
  };

  // Allow drop by preventing default behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const command = e.dataTransfer.getData("command");
    setCommands((prevCommands) => [...prevCommands, command]);
  };

  // Function to move the figure and perform commands
  const executeCommands = () => {
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
        case "light":
          checkLamp(top, left);
          break;
        case "eat":
          checkFruit(top, left);
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

  // Check if the figure reaches the lamp
  const checkLamp = (top, left) => {
    if (
      left < lampPosition.left + 50 &&
      left + 40 > lampPosition.left &&
      top < lampPosition.top + 50 &&
      top + 40 > lampPosition.top
    ) {
      setLampLit(true);
    } else {
      alert("You need to be near the lamp to light it up!");
    }
  };

  // Check if the figure reaches the fruit
  const checkFruit = (top, left) => {
    if (
      left < fruitPosition.left + 50 &&
      left + 40 > fruitPosition.left &&
      top < fruitPosition.top + 50 &&
      top + 40 > fruitPosition.top
    ) {
      setFruitEaten(true);
    } else {
      alert("You need to be near the fruit to eat it!");
    }
  };

  // Check if the figure reaches the goal
  const checkGoal = (top, left) => {
    if (
      left < goalPosition.left + 50 &&
      left + 40 > goalPosition.left &&
      top < goalPosition.top + 50 &&
      top + 40 > goalPosition.top
    ) {
      if (lampLit && fruitEaten) {
        alert("You reached the goal, lit the lamp, and ate the fruit!");
      } else {
        alert("You reached the goal, but missed lighting the lamp or eating the fruit!");
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Move, Light Up, and Eat to Complete the Tasks!</h1>

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
        {/* The Path (highlighting where to move) */}
        <svg
          id="path"
          width="600"
          height="400"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          {/* Path from start to lamp */}
          <line x1="70" y1="200" x2="210" y2="120" stroke="black" strokeWidth="5" />
          {/* Path from lamp to fruit */}
          <line x1="210" y1="120" x2="430" y2="270" stroke="black" strokeWidth="5" />
          {/* Path from fruit to goal */}
          <line x1="430" y1="270" x2="520" y2="80" stroke="black" strokeWidth="5" />
        </svg>

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
            zIndex: 1,
          }}
        >
          <circle cx="20" cy="20" r="20" />
        </svg>

        {/* Lamp (Checkpoint 1) */}
        <svg
          id="lamp"
          style={{
            width: "50px",
            height: "50px",
            fill: lampLit ? "yellow" : "gray",
            position: "absolute",
            top: `${lampPosition.top}px`,
            left: `${lampPosition.left}px`,
            zIndex: 1,
          }}
        >
          <rect width="50" height="50" />
        </svg>

        {/* Fruit (Checkpoint 2) */}
        <svg
          id="fruit"
          style={{
            width: "50px",
            height: "50px",
            fill: fruitEaten ? "orange" : "red",
            position: "absolute",
            top: `${fruitPosition.top}px`,
            left: `${fruitPosition.left}px`,
            zIndex: 1,
          }}
        >
          <circle cx="25" cy="25" r="25" />
        </svg>

        {/* Goal */}
        <svg
          id="goal"
          style={{
            width: "50px",
            height: "50px",
            fill: "green",
            position: "absolute",
            top: `${goalPosition.top}px`,
            left: `${goalPosition.left}px`,
            zIndex: 1,
          }}
        >
          <rect width="50" height="50" />
        </svg>
      </div>

      {/* Command options for movement and interaction */}
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

        {/* New commands: Eat and Light */}
        <div
          className="command"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "light")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffd700",
            border: "1px solid #000",
            display: "inline-block",
            width: "100px",
            cursor: "pointer",
          }}
        >
          Light Up
        </div>
        <div
          className="command"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "eat")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ff6347",
            border: "1px solid #000",
            display: "inline-block",
            width: "100px",
            cursor: "pointer",
          }}
        >
          Eat
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
          : commands.map((command, index) => <div key={index}>{command}</div>)}
      </div>

      {/* Execute button */}
      <button onClick={executeCommands} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Execute Commands
      </button>
    </div>
  );
};

export default PathGame;

