import React, { useState, useEffect } from "react";
import Fruit from "../../Components/figures/Fruit";
import Flag from "../../Components/figures/Flag";
import Robot from "../../Components/figures/Robot";
import Lamp from "../../Components/figures/Lamp";
import Modal from "react-modal";
import "./games-view.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faAppleAlt, faLightbulb, faTimes } from '@fortawesome/free-solid-svg-icons';
Modal.setAppElement("#root"); // Add this line for accessibility

export const Games = () => {
  const [commands, setCommands] = useState([]);
  const [figurePosition, setFigurePosition] = useState({ row: 4, col: 1 });
  const [lampLit, setLampLit] = useState(false);
  const [fruitEaten, setFruitEaten] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(""); // To store modal content

  const [draggingIndex, setDraggingIndex] = useState(null); // Track the index of the dragging command

  const lampPosition = { row: 2, col: 4 };
  const fruitPosition = { row: 6, col: 8 };
  const flagPosition = { row: 1, col: 10 };

  function openModal(content) {
    setModalContent(content); // Set the dynamic content
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    resetGame();
  }

    // Function to reset the game
    const resetGame = () => {
      setFigurePosition({ row: 4, col: 1 });
      setLampLit(false);
      setFruitEaten(false);
      setCommands([]);
    };

  // Function to add a delay between commands
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const executeCommands = async () => {
    let { row, col } = figurePosition; // Use row and col

    for (let command of commands) {
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
        case "light lamp":
          checkLamp(row, col); // Check lamp after movement
          break;
        case "eat fruit":
          checkFruit(row, col); // Check fruit after movement
          break;
        default:
          break;
      }

      // Update the figure's position for each command
      setFigurePosition({ row, col });

      // Wait 0.5 seconds before executing the next command
      await delay(500);
    }

    // Clear commands after execution
    setCommands([]);
  };

  // Adjusted functions to check lamp and fruit positions
  const checkLamp = (row, col) => {
    if (row === lampPosition.row && col === lampPosition.col) {
      setLampLit(true);
    } else {
      openModal("Du behöver vara nära lampan för att tända den!"); // Show error modal
    }
  };

  const checkFruit = (row, col) => {
    if (row === fruitPosition.row && col === fruitPosition.col) {
      setFruitEaten(true);
    } else {
      openModal("Du behöver vara nära frukten för att äta den!"); // Show error modal
    }
  };

  const checkFlag = (row, col) => {
    if (row === flagPosition.row && col === flagPosition.col) {
      if (lampLit && fruitEaten) {
        openModal("Congratulations! You have completed all tasks!");
      } else {
        openModal("Try again! You missed lighting the lamp or eating the fruit.");
      }
    }
  };
  
  // Check whether all tasks are completed
const checkCompletion = (row, col) => {
  // If the figure is not at the flag, show the "try again" modal
  if (row !== flagPosition.row || col !== flagPosition.col) {
    openModal("Försök igen, måste avsluta på flaggan!");
    return;
  }

  // Check if all tasks (lighting the lamp, eating the fruit, and reaching the flag) are completed

  console.log("Lamp lit:", lampLit, "Fruit eaten:", fruitEaten);
  
  if (lampLit && fruitEaten) {
    openModal("Grattis! Du har slutfört alla uppgifter! Rosanna har godis till dig!");
  } else {
    openModal("Försök igen!");
  }
};

  // Add commands by clicking buttons
  const handleCommandClick = (command) => {
    setCommands((prevCommands) => [...prevCommands, command]);
  };

  // Handle drag start for reordering commands
  const handleDragStartCommand = (index) => {
    setDraggingIndex(index);
  };

  // Allow drag over for command reordering
  const handleDragOverCommand = (e) => {
    e.preventDefault();
  };

  // Handle dropping commands to change their order
  const handleDropCommand = (index) => {
    const newCommands = [...commands];
    const draggedCommand = newCommands[draggingIndex];
    newCommands.splice(draggingIndex, 1); // Remove the dragged command from the original position
    newCommands.splice(index, 0, draggedCommand); // Insert it at the new position
    setCommands(newCommands);
    setDraggingIndex(null); // Reset dragging index
  };

  // Delete a command when clicking the red X button
  const handleDeleteCommand = (index) => {
    const newCommands = [...commands];
    newCommands.splice(index, 1); // Remove the selected command
    setCommands(newCommands);
  };

  useEffect(() => {
    if (figurePosition.row === flagPosition.row && figurePosition.col === flagPosition.col) {
      checkCompletion(figurePosition.row, figurePosition.col);
    }
  }, [figurePosition]); // useEffect triggas varje gång positionen ändras

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

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Modal"
        className={"game-modal"}
        overlayClassName={"game-modal-overlay"} // Add this for the overlay
      >
        <h2>{modalContent}</h2>
        <button onClick={closeModal}>Spela igen!</button>
      </Modal>

      {/* Command options */}
      <div id="command-container" style={{ marginTop: "20px" }}>
      <button
          onClick={() => handleCommandClick("up")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Gå Upp
          <FontAwesomeIcon icon={faArrowUp} />
        </button>

        <button
          onClick={() => handleCommandClick("down")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Gå Ner
          <FontAwesomeIcon icon={faArrowDown} />
        </button>

        <button
          onClick={() => handleCommandClick("left")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Gå Vänster
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <button
          onClick={() => handleCommandClick("right")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffcc00",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Gå Höger
          <FontAwesomeIcon icon={faArrowRight} />
        </button>

        {/* New commands: Eat and Light */}
        <button
          onClick={() => handleCommandClick("light lamp")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffd700",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Tänd Lampa
          <FontAwesomeIcon icon={faLightbulb} />
        </button>

        <button
          onClick={() => handleCommandClick("eat fruit")}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "#ffd700",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Ät Äpple
          <FontAwesomeIcon icon={faAppleAlt} />
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
          ? "Inga kommandon har lagts till ännu"
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
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} color="red" />
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
