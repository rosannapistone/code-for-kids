import React, { useState } from "react";
import Fruit from "./figures/Fruit"; 
import Flag from "./figures/Flag"; 
import Robot from "./figures/Robot"; 
import Lamp from "./figures/Lamp"; 

const PathGame = () => {
  const [commands, setCommands] = useState([]);
  const [figurePosition, setFigurePosition] = useState({ row: 4, col: 1 });
  const [lampLit, setLampLit] = useState(false);
  const [fruitEaten, setFruitEaten] = useState(false);

  const [draggingIndex, setDraggingIndex] = useState(null); // Track dragging index


  const lampPosition = { row: 2, col: 4 };
  const fruitPosition = { row: 6, col: 8 };
  const flagPosition = { row: 1, col: 10 };

  // Function to move the figure and perform commands
  const executeCommands = () => {
    let { row, col } = figurePosition; // use row and col

    commands.forEach((command) => {
      switch (command) {
        case "up":
          row = Math.max(1, row - 1); // Prevent going off grid
          break;
        case "down":
          row = Math.min(8, row + 1); // Prevent going off grid
          break;
        case "left":
          col = Math.max(1, col - 1); // Prevent going off grid
          break;
        case "right":
          col = Math.min(12, col + 1); // Prevent going off grid
          break;
        case "light":
          checkLamp(row, col);
          break;
        case "eat":
          checkFruit(row, col);
          break;
        default:
          break;
      }
    });

    // Update figure's position
    setFigurePosition({ row, col });

    // Check if the figure has reached the flag
    checkFlag(row, col);

    // Clear commands after execution
    setCommands([]);
  };

  // Check if the figure reaches the lamp
  const checkLamp = (row, col) => {
    if (row === lampPosition.row && col === lampPosition.col) {
      setLampLit(true);
    } else {
      alert("You need to be near the lamp to light it up!");
    }
  };

  // Check if the figure reaches the fruit
  const checkFruit = (row, col) => {
    if (row === fruitPosition.row && col === fruitPosition.col) {
      setFruitEaten(true);
    } else {
      alert("You need to be near the fruit to eat it!");
    }
  };

  // Check if the figure reaches the flag
  const checkFlag = (row, col) => {
    if (row === flagPosition.row && col === flagPosition.col) {
      if (lampLit && fruitEaten) {
        alert("You reached the flag, lit the lamp, and ate the fruit!");
      } else {
        alert(
          "You reached the flag, but missed lighting the lamp or eating the fruit!"
        );
      }
    }
  };

  // Handle adding commands by clicking buttons
  const handleCommandClick = (command) => {
    setCommands((prevCommands) => [...prevCommands, command]);
  };

  // Handle drag start in the command list
  const handleDragStartCommand = (index) => {
    setDraggingIndex(index);
  };

  // Handle drag over to allow drop
  const handleDragOverCommand = (e) => {
    e.preventDefault();
  };

  // Handle drop for reordering commands
  const handleDropCommand = (index) => {
    const newCommands = [...commands];
    const draggedCommand = newCommands[draggingIndex];
    newCommands.splice(draggingIndex, 1); // Remove the dragged command from the original position
    newCommands.splice(index, 0, draggedCommand); // Insert it at the new position
    setCommands(newCommands);
    setDraggingIndex(null); // Reset dragging index
  };

  // Handle deleting a command when clicking the red X button
  const handleDeleteCommand = (index) => {
    const newCommands = [...commands];
    newCommands.splice(index, 1); // Remove the selected command
    setCommands(newCommands);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tänd lampan, ät äpplet och hämta flaggan!</h1>

      {/* Game Area with Grid Layout */}
      <div
        id="game-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 50px)",
          gridTemplateRows: "repeat(8, 50px)",
          width: "600px",
          height: "400px",
          position: "relative",
          border: "2px solid black",
          backgroundColor: "#E7E7E7",
          margin: "0 auto",
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      >
        {/* Use the components for each figure */}
        <Robot position={figurePosition} />
        <Lamp position={lampPosition} lit={lampLit} />
        <Fruit position={fruitPosition} eaten={fruitEaten} />
        <Flag position={flagPosition} />
      </div>

      {/* Command options */}
      <div id="command-container" style={{ marginTop: "20px" }}>
        <button
          onClick={() => handleCommandClick("up")}
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
        </button>
        <button
          onClick={() => handleCommandClick("down")}
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
        </button>
        <button
          onClick={() => handleCommandClick("left")}
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
        </button>
        <button
          onClick={() => handleCommandClick("right")}
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
        </button>

        {/* New commands: Eat and Light */}
        <button
          onClick={() => handleCommandClick("light")}
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
        </button>
        <button
          onClick={() => handleCommandClick("eat")}
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
        </button>
      </div>

      {/* Command List with Delete Button */}
      <div
        id="command-list"
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
          ? "No commands added yet"
          : commands.map((command, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStartCommand(index)}
                onDragOver={handleDragOverCommand}
                onDrop={() => handleDropCommand(index)}
                style={{
                  padding: "5px",
                  margin: "5px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ddd",
                  cursor: "move",
                  display: "flex",
                  justifyContent: "space-between", // Aligns the X button on the right
                }}
              >
                <span>{command}</span>
                <button
                  onClick={() => handleDeleteCommand(index)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>
            ))}
      </div>

      {/* Execute button */}
      <button
        onClick={executeCommands}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Kör!
      </button>
    </div>
  );
};

export default PathGame;
