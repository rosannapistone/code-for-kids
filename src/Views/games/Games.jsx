import React, { useState, useEffect } from "react";
import Fruit from "../../Components/figures/Fruit";
import Flag from "../../Components/figures/Flag";
import Robot from "../../Components/figures/Robot";
import Lamp from "../../Components/figures/Lamp";
import Modal from "react-modal";
import "./games-view.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faAppleAlt,
  faLightbulb,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
Modal.setAppElement("#root"); // Add this line for accessibility

export const Games = () => {
  const [commands, setCommands] = useState([]);
  const [figurePosition, setFigurePosition] = useState({ row: 4, col: 1 });
  const [lampLit, setLampLit] = useState(false);
  const [fruitEaten, setFruitEaten] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(""); // To store modal content
  const [gameStarted, setGameStarted] = useState(false);
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
    setGameStarted(false);
    setCommands([]);
  };

  // Function to add a delay between commands
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const executeCommands = async () => {
    setGameStarted(true);
    let { row, col } = figurePosition; // Use row and col

    for (let command of commands) {
      switch (command) {
        case "Gå upp":
          row = Math.max(1, row - 1); // Prevent going off grid
          break;
        case "Gå ner":
          row = Math.min(8, row + 1); // Prevent going off grid
          break;
        case "Gå vänster":
          col = Math.max(1, col - 1); // Prevent going off grid
          break;
        case "Gå höger":
          col = Math.min(12, col + 1); // Prevent going off grid
          break;
        case "Tänd lampa":
          checkLamp(row, col); // Check lamp after movement
          break;
        case "Ät äpple":
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
    if (!gameStarted) return;

    // Check whether all tasks are completed
    const checkCompletion = (row, col) => {
      // If the figure is not at the flag, show the "try again" modal
      if (row !== flagPosition.row || col !== flagPosition.col) {
        openModal("Försök igen, måste avsluta på flaggan!");
        return;
      }

      if (lampLit && fruitEaten) {
        openModal(
          "Grattis! Du har slutfört alla uppgifter! Rosanna har godis till dig!"
        );
      } else {
        openModal("Försök igen!");
      }
    };

    if (
      figurePosition.row === flagPosition.row &&
      figurePosition.col === flagPosition.col
    ) {
      checkCompletion(figurePosition.row, figurePosition.col);
    } else if (commands.length === 0) {
      openModal("Försök igen!");
    }
  }, [
    figurePosition,
    flagPosition.col,
    flagPosition.row,
    gameStarted,
    commands.length,
    lampLit,
    fruitEaten,
  ]);

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
          onClick={() => handleCommandClick("Gå upp")}
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
          onClick={() => handleCommandClick("Gå ner")}
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
          onClick={() => handleCommandClick("Gå vänster")}
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
          onClick={() => handleCommandClick("Gå höger")}
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
          onClick={() => handleCommandClick("Tänd lampa")}
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
          onClick={() => handleCommandClick("Ät äpple")}
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
        <button
          onClick={() => setCommands([])} // This clears the commands
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "red",
            color: "white",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Rensa Kommandon
        </button>
        <button
          onClick={executeCommands}
          style={{
            padding: "10px",
            color: "white",
            margin: "10px",
            backgroundColor: "green",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "space-around",
          }}
        >
          Kör!
        </button>
      </div>

      {/* Command List with Delete Button */}
      <div
        id="command-list"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          border: "2px dashed #ccc",
          minHeight: "200px",
          maxHeight: "200px",
          width: "50%",
          flexWrap: "wrap",
          margin: "20px auto",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          gap: "0px",
          alignContent: "flex-start",
        }}
      >
        {commands.length === 0
          ? "Klicka på ett kommando för att lägga till det!"
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
                  alignItems: "center",
                  flex: "1",
                  width: "15%",
                  maxHeight: "20px",
                }}
              >
                <span>
                  {" "}
                  {index + 1 + ". "}
                  {command}
                </span>
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
    </div>
  );
};
