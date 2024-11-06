import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Fruit from "../../Components/figures/Fruit";
import Flag from "../../Components/figures/Flag";
import Robot from "../../Components/figures/Robot";
import Lamp from "../../Components/figures/Lamp";
import Wall from "../../Components/figures/Wall";
import Door from "../../Components/figures/Door";
import Key from "../../Components/figures/Key";
import Portal from "../../Components/figures/Portal";

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
} from "@fortawesome/free-solid-svg-icons";
Modal.setAppElement("#root"); // Add this line for accessibility

const getIcon = (commandType) => {
  switch (commandType) {
    case "up":
      return faArrowUp;
    case "down":
      return faArrowDown;
    case "left":
      return faArrowLeft;
    case "right":
      return faArrowRight;
    case "light":
      return faLightbulb;
    case "eat":
      return faAppleAlt;
    default:
      return null;
  }
};

const levelLabels = {
  1: "Andra nivån",
  2: "Tredje nivån",
  3: "Första nivån",
  4: "Fjärde nivån",
};


export const Games = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const navigate = useNavigate();
  const [commands, setCommands] = useState([]);
  const [displayedCommands, setDisplayedCommands] = useState([]); // for rendering arrows
  const [figurePosition, setFigurePosition] = useState({ row: 4, col: 1 });
  const [currentCommandPosition, setCurrentCommandPosition] = useState({
    row: 4,
    col: 1,
  });
  const [lampLit, setLampLit] = useState(false);
  const [fruitEaten, setFruitEaten] = useState(false);
  const [robotWithKey, setrobotWithKey] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [lampPosition, setLampPosition] = useState({ row: 0, col: 0 });
  const [fruitPosition, setFruitPosition] = useState({ row: 0, col: 0 });
  const [flagPosition, setFlagPosition] = useState({ row: 0, col: 0 });
  const [doorPosition, setDoorPosition] = useState({row: 0, col: 0});
  const [keyPosition, setKeyPosition] = useState({row: 0, col: 0});
  const [portalPosition, setPortalPosition] = useState([]);
  const [wallPosition, setWallPosition] = useState([]);
  
  const numRows = 4;
  const numCols = 12;

  // Function to reset the game
  const resetGame = useCallback(() => {
    setFigurePosition({ row: 4, col: 1 });
    setCurrentCommandPosition({ row: 4, col: 1 });
    clearArrows();
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setrobotWithKey(false);
    setDoorPosition({row:4, col:11});
    setKeyPosition({row:1, col: 8});
    setCommands([]);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    resetGame();
  }, [resetGame]);

  const openModal = useCallback((content, autoClose = false) => {
    setModalContent(content); 
    setIsOpen(true);
    if (autoClose) {
      setTimeout(() => {
        closeModal();
      }, 2000);
    }
  }, [closeModal]);



  const isWallPosition = (row, col) => {
    return wallPosition.some((wall) => wall.row === row && wall.col === col);
  };

  useEffect(() => {
    if (
      robotWithKey &&
      figurePosition.row === doorPosition?.row &&
      figurePosition.col === doorPosition?.col - 1
    ) {
      setDoorPosition(null);
    }
  }, [robotWithKey, figurePosition, doorPosition]);

  const pickUpKey = (row, col) => {
    if (row === keyPosition?.row && col === keyPosition?.col) {
      setKeyPosition(null);
      setrobotWithKey(true);
    }
  };

  const clearArrows = () => {
    setDisplayedCommands([]);
  };

  const firstLevel = useCallback(() => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setCommands([]);
    setLampPosition({ row: 2, col: 4 });
    setFruitPosition({ row: 2, col: 7 });
    setFlagPosition({ row: 2, col: 10 });
    setDoorPosition(null);
    setKeyPosition(null);
    setWallPosition([]);
    setPortalPosition([]);
  }, []);

  
  useEffect(() => {
    firstLevel();
  }, [firstLevel]);

  const goToLandingPage = () => {
    navigate("/");
  };

  const nextLevel = () => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setCommands([]);

    setLampPosition({ row: 1, col: 6 });
    setFruitPosition({ row: 4, col: 9 });
    setFlagPosition({ row: 1, col: 12 });
    setDoorPosition(null);
    setKeyPosition(null);
    setPortalPosition([]);
    setWallPosition([
      { row: 2, col: 6 },
      { row: 3, col: 6 },
      { row: 4, col: 6 },

      { row: 1, col: 9 },
      { row: 2, col: 9 },
      { row: 3, col: 9 },
    ]);

    openModal("Välkommen till andra nivån!", true);
  };

  const thirdLevel = () => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setrobotWithKey(false);
    setCommands([]);

    setLampPosition({ row: 3, col: 3 });
    setFruitPosition({ row: 3, col: 5 });
    setFlagPosition({ row: 4, col: 12 });
    setKeyPosition({ row: 1, col: 8 });
    setPortalPosition([]);
    setWallPosition([
      { row: 2, col: 4 },
      { row: 3, col: 4 },
      { row: 4, col: 4 },
      { row: 2, col: 3 },
      { row: 2, col: 5 },

      { row: 1, col: 7 },
      { row: 2, col: 7 },
      { row: 2, col: 8 },
      { row: 2, col: 9 },

      { row: 3, col: 11 },
      { row: 3, col: 12 },
    ]);

    setDoorPosition({row: 4, col: 11})
    openModal("Välkommen till tredje nivån!", true);
  };

  const fourthLevel = () => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setrobotWithKey(false);
    setCommands([]);

    setLampPosition(null);
    setFruitPosition(null);
    setDoorPosition(null)

    setFlagPosition({row:2, col:12});
    setPortalPosition([
      { row: 2, col: 3},
      { row: 2, col: 8},
    ]);
    setKeyPosition({row: 2, col: 6});



    setWallPosition([
      { row: 1, col: 4 },
      { row: 2, col: 4 },
      { row: 3, col: 4 },
      { row: 4, col: 4 },

      { row: 1, col: 7 },
      { row: 2, col: 7 },
      { row: 3, col: 7 },
      { row: 4, col: 7 },
    ]);

    openModal("Välkommen till fjärde nivån!", true);
  };

  const handleLevelChange = () => {
    if (currentLevel === 1) {
      nextLevel();
      setCurrentLevel(2);
    } else if (currentLevel === 2) {
      thirdLevel();
      setCurrentLevel(3);
    } else if (currentLevel === 3){
      fourthLevel();
      setCurrentLevel(4);
    }
      else {
      firstLevel();
      setCurrentLevel(1);
    }
  };


  // Function to add a delay between commands
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const executeCommands = async () => {
    clearArrows();
    setGameStarted(true);
    let { row, col } = figurePosition; // Use row and col

    for (let command of commands) {
      let newRow = row;
      let newCol = col;
  
      switch (command.commandType) {
        case "up":
          newRow = command.row;
          break;
        case "down":
          newRow = command.row;
          break;
        case "left":
          newCol = command.col;
          break;
        case "right":
          newCol = command.col;
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
      if (isWallPosition(newRow, newCol)) {
        openModal("Du råkade springa rakt in i väggen, vi testar igen!");
        resetGame();
        return;
      }

      /*
      if (newRow === portalPosition1.row && newCol === portalPosition1.col && !portalTransfer) {
        setPortalTransfer(true);  // Toggle portalTransfer
        newRow = portalPosition2.row;  // Move to the other portal
        newCol = portalPosition2.col;
    } else if (newRow === portalPosition2.row && newCol === portalPosition2.col && portalTransfer) {
        setPortalTransfer(false);  // Toggle portalTransfer back
        newRow = portalPosition1.row;  // Move to the other portal
        newCol = portalPosition1.col;
    }
*/
      row = newRow;
      col = newCol;

      setFigurePosition({ row, col });
      pickUpKey(row, col);
      //unlockDoor(row, col, robotWithKey);
      
      await delay(500);
    }

    setCommands([]);
  };

  const calculateCommands = async (command) => {
    let { row, col } = currentCommandPosition;

    let newCommand = {
      row: row,
      col: col,
      commandType: "",
    };

    switch (command) {
      case "up": {
        let newRow = Math.max(1, row - 1);
        newCommand.row = newRow;
        newCommand.commandType = "up";
        break;
      }
      case "down": {
        let newRow = Math.min(numRows, row + 1);
        newCommand.row = newRow;
        newCommand.commandType = "down";
        break;
      }
      case "left": {
        let newCol = Math.max(1, col - 1);
        newCommand.col = newCol;
        newCommand.commandType = "left";
        break;
      }
      case "right": {
        let newCol = Math.min(numCols, col + 1);
        newCommand.col = newCol;
        newCommand.commandType = "right";
        break;
      }
      case "light":
        newCommand.commandType = "light";
        break;
      case "eat":
        newCommand.commandType = "eat";
        break;

      default:
        break;
    }

    setCommands((prevCommands) => [...prevCommands, newCommand]);
    setDisplayedCommands((prev) => [...prev, newCommand]);

    setCurrentCommandPosition({ row: newCommand.row, col: newCommand.col });
  };

  const checkLamp = (row, col) => {
    if (row === lampPosition?.row && col === lampPosition?.col) {
      setLampLit(true);
    } else {
      openModal("Du behöver vara nära lampan för att tända den!");
    }
  };

  const checkFruit = (row, col) => {
    if (row === fruitPosition?.row && col === fruitPosition?.col) {
      setFruitEaten(true);
    } else {
      openModal("Du behöver vara nära frukten för att äta den!");
    }
  };

  useEffect(() => {
    console.log("CMD Pos Row", currentCommandPosition.row, "CMD Pos Col:", currentCommandPosition.col);

  }, [currentCommandPosition])
  const handleCommandClick = (command) => {
    calculateCommands(command);
  };

  useEffect(() => {
    if (!gameStarted) return;
    //console.log("Command Length :",commands.length);
    const checkCompletion = (row, col) => {
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
      figurePosition.row === flagPosition?.row &&
      figurePosition.col === flagPosition?.col
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
    openModal
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tänd lampan, ät äpplet och hämta flaggan!</h1>

      {/* Game Area with Grid Layout */}
      <div
        id="game-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 50px)`,
          gridTemplateRows: `repeat(${numRows}, 50px)`,
          width: `${numCols * 50}px`,
          height: `${numRows * 50}px`,
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
        <Robot position={figurePosition} withKey={robotWithKey} />
        {lampPosition && <Lamp position={lampPosition} lit={lampLit} />}
        {fruitPosition && <Fruit position={fruitPosition} eaten={fruitEaten} />}
        {flagPosition && <Flag position={flagPosition} />}
        {(doorPosition &&currentLevel === 3 ) && <Door position={doorPosition} />}
        {(keyPosition &&currentLevel === 3) && <Key position={keyPosition}  />}
        {portalPosition.map((position, index) => (<Portal key={index} position={position} />))}
        {wallPosition.map((position, index) => (<Wall key={index} position={position} />))}
        {displayedCommands.map((command, index) => {
  //console.log("Command:", command); 

  if (command.commandType === "light" || command.commandType === "eat") {
    // Skip rendering an icon for "light" and "eat" commands
    return null;
  }
  const icon = getIcon(command.commandType);
  return icon ? (
    <FontAwesomeIcon
      key={index}
      icon={icon}
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: `${(command.row - 1) * 50}px`,
        left: `${(command.col - 1) * 50}px`,
        zIndex: 1,
      }}
    />
  ) : null;
})}

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Modal"
        className={"game-modal"}
        overlayClassName={"game-modal-overlay"} // Add this for the overlay
      >
        <h2>{modalContent}</h2>
        {!modalContent.includes("Välkommen till") && (
          <button onClick={closeModal}>Spela igen!</button>
        )}
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

        <button
          onClick={() => handleCommandClick("light")}
          disabled = {!(currentCommandPosition?.row === lampPosition?.row && currentCommandPosition?.col === lampPosition?.col)}
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
          onClick={() => handleCommandClick("eat")}
          disabled = {!(currentCommandPosition?.row === fruitPosition?.row && currentCommandPosition?.col === fruitPosition?.col)}
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
          onClick={resetGame}
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
        <button
          onClick={handleLevelChange}
          style={{
            padding: "10px",
            color: "white",
            margin: "10px",
            backgroundColor: "purple",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "center",
          }}
        >
          {levelLabels[currentLevel]}
        </button>
        <button
          onClick={goToLandingPage}
          style={{
            padding: "10px",
            color: "white",
            margin: "10px",
            backgroundColor: "blue",
            border: "1px solid #000",
            display: "inline-flex",
            minWidth: "120px",
            cursor: "pointer",
            justifyContent: "center",
          }}
        >
          Gå till startsidan
        </button>
      </div>
    </div>
  );
};
