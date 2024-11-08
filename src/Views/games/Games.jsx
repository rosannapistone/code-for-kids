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
import Portal2 from "../../Components/figures/Portal2";
import Chest from "../../Components/figures/Chest";

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

/* --- Function for accessing the right iconArrows ---*/
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
/* --- The whole game! --- */
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
  const [chestOpen, setChestOpen] = useState(false);
  const [fruitEaten, setFruitEaten] = useState(false);
  const [robotWithKey, setrobotWithKey] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [riddleAttempts, setRiddleAttempts] = useState(0);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [showRiddleInput, setShowRiddleInput] = useState(false);

  const [lampPosition, setLampPosition] = useState({ row: 0, col: 0 });
  const [fruitPosition, setFruitPosition] = useState({ row: 0, col: 0 });
  const [flagPosition, setFlagPosition] = useState({ row: 0, col: 0 });
  const [doorPosition, setDoorPosition] = useState({ row: 0, col: 0 });
  const [keyPosition, setKeyPosition] = useState({ row: 0, col: 0 });
  const [chestPosition, setChestPosition] = useState({ row: 0, col: 0 });
  const [portalPosition, setPortalPosition] = useState([]);
  const [portalPosition2, setPortalPosition2] = useState([]);
  const [wallPosition, setWallPosition] = useState([]);

  const numRows = 4;
  const numCols = 12;

  const portalPosition1 = { row: 4, col: 3 };
  const portalPosition11 = { row: 4, col: 5 };

  const portalPosition22 = { row: 1, col: 8 };
  const portalPosition222 = { row: 1, col: 6 };

  /* --- Function for updating the arrows --- */
  const updateArrowPosition = (newRow, newCol) => {
    setDisplayedCommands((prevCommands) => [
      ...prevCommands,
      { row: newRow, col: newCol },
    ]);
  };

  const correctRiddleAnswer = "treasure"; // Replace this with the actual answer

  /* --- Function for handling the chest, with a riddle and answer (3 times try) --- */
  const handleRiddleSubmit = () => {
    if (riddleAnswer.toLowerCase() === correctRiddleAnswer.toLowerCase()) {
      openModal("Rätt svar! Du öppnade kistan!");
      setChestOpen(true);
      setShowRiddleInput(false);
    } else {
      setRiddleAttempts((prev) => prev + 1);
      if (riddleAttempts >= 2) {
        openModal("Fel svar tre gånger! Du måste börja om.");
        resetGame();
      } else {
        openModal("Fel svar. Försök igen!");
      }
    }
    setRiddleAnswer("");
  };

  const checkChest = (row, col) => {
    if (
      row === chestPosition?.row &&
      col === chestPosition?.col &&
      currentLevel === 5
    ) {
      openModal("Du hittade en kista! Svara på gåtan:");
      setShowRiddleInput(true);
      setRiddleAttempts(0);
    }
  };

  /* --- Function for reseting the game */
  const resetGame = useCallback(() => {
    setFigurePosition({ row: 4, col: 1 });
    setCurrentCommandPosition({ row: 4, col: 1 });
    clearArrows();
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setrobotWithKey(false);
    setDoorPosition({ row: 4, col: 11 });
    setKeyPosition({ row: 1, col: 8 });
    setCommands([]);
  }, []);

  /* --- Function for closing the popup ---*/
  const closeModal = useCallback(() => {
    setIsOpen(false);
    resetGame();
  }, [resetGame]);

  /* --- Function for popup - closes after 2 second if not pressed ---*/
  const openModal = useCallback(
    (content, autoClose = false) => {
      setModalContent(content);
      setIsOpen(true);
      if (autoClose) {
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    },
    [closeModal]
  );

  /* --- Function for checking if robot is running into the wall!!! ---*/
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
    if (
      row === keyPosition?.row &&
      col === keyPosition?.col &&
      currentLevel === 3
    ) {
      setKeyPosition(null);
      setrobotWithKey(true);
    }
  };

  const clearArrows = () => {
    setDisplayedCommands([]);
  };
  /*--- The third level - includes a lamp and apple ---*/
  const firstLevel = useCallback(() => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setCommands([]);
    setLampPosition({ row: 2, col: 4 });
    setFruitPosition({ row: 2, col: 7 });
    setFlagPosition({ row: 2, col: 10 });
    setChestPosition(null);
    setDoorPosition(null);
    setKeyPosition(null);
    setWallPosition([]);
    setPortalPosition([]);
    setPortalPosition2([]);
  }, []);

  useEffect(() => {
    firstLevel();
  }, [firstLevel]);

  const goToLandingPage = () => {
    navigate("/");
  };
  /*--- The third level - includes a wall, lamp and apple ---*/
  const secondLevel = () => {
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
    setChestPosition(null);
    setPortalPosition([]);
    setPortalPosition2([]);
    setWallPosition([
      { row: 2, col: 6 },
      { row: 3, col: 6 },
      { row: 4, col: 6 },

      { row: 1, col: 9 },
      { row: 2, col: 9 },
      { row: 3, col: 9 },
    ]);
  };
  /*--- The third level - includes a wall, lamp and apple and key with a door---*/
  const thirdLevel = () => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setrobotWithKey(false);
    setCommands([]);
    setChestPosition(null);
    setLampPosition({ row: 3, col: 3 });
    setFruitPosition({ row: 3, col: 5 });
    setFlagPosition({ row: 4, col: 12 });
    setKeyPosition({ row: 1, col: 8 });
    setPortalPosition([]);
    setPortalPosition2([]);
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

    setDoorPosition({ row: 4, col: 11 });
  };
  /*--- The fourth level - includes portals ---*/
  const fourthLevel = () => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setrobotWithKey(false);
    setCommands([]);

    setLampPosition(null);
    setFruitPosition(null);
    setDoorPosition(null);
    setChestPosition(null);
    setFlagPosition({ row: 2, col: 12 });
    setPortalPosition([portalPosition1, portalPosition11]);
    setPortalPosition2([portalPosition22, portalPosition222]);

    setKeyPosition({ row: 2, col: 6 });

    setWallPosition([
      { row: 1, col: 4 },
      { row: 2, col: 4 },
      { row: 3, col: 4 },
      { row: 4, col: 4 },
      /*{ row: 2, col: 6 },*/
      { row: 1, col: 7 },
      { row: 2, col: 7 },
      { row: 3, col: 7 },
      { row: 4, col: 7 },
    ]);
  };

  /*--- The fifth level - includes chest and a password ---*/
  const fifthLevel = () => {
    setFigurePosition({ row: 4, col: 1 });
    setLampLit(false);
    setFruitEaten(false);
    setGameStarted(false);
    setrobotWithKey(false);
    setCommands([]);

    setLampPosition({ row: 2, col: 4 });
    setFruitPosition({ row: 2, col: 7 });
    setChestPosition({ row: 2, col: 1 });
    //setChestPosition({row: 2, col: 10});
    setDoorPosition(null);

    setFlagPosition({ row: 2, col: 11 });
    setPortalPosition([]);
    setPortalPosition2([]);
    setKeyPosition();

    setWallPosition([
      { row: 1, col: 0 + 1 },
      { row: 1, col: 0 + 2 },
      { row: 1, col: 0 + 3 },
      { row: 1, col: 0 + 4 },
      { row: 1, col: 1 + 4 },
      { row: 1, col: 2 + 4 },
      { row: 1, col: 3 + 4 },
      { row: 1, col: 4 + 4 },
      { row: 1, col: 5 + 4 },
      { row: 1, col: 6 + 4 },
      { row: 1, col: 7 + 4 },
      { row: 1, col: 8 + 4 },

      { row: 2, col: 8 + 4 },

      { row: 3, col: 8 + 4 },
      { row: 3, col: 7 + 4 },
      { row: 3, col: 5 + 4 },
      { row: 3, col: 4 + 4 },
      { row: 3, col: 6 + 4 },
      { row: 3, col: 3 + 4 },
      { row: 3, col: 2 + 4 },
      { row: 3, col: 1 + 4 },
      { row: 3, col: 0 + 4 },
      { row: 3, col: 0 + 3 },
      { row: 3, col: 0 + 2 },

      /*
      {row: 4, col: 8+4},
      {row: 4, col: 7+4},
      {row: 4, col: 5+4},
      {row: 4, col: 4+4},
      {row: 4, col: 6+4},
      {row: 4, col: 3+4},
      {row: 4, col: 2+4},
      {row: 4, col: 1+4},
      {row: 4, col: 0+4},
      {row: 4, col: 0+3},
      */
      { row: 4, col: 0 + 2 },
    ]);
  };

  /* --- Function for creating a delay ---*/
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ... Function for executing the commands that are init by the user ---*/
  const executeCommands = async () => {
    clearArrows();
    setGameStarted(true);
    let { row, col } = figurePosition;

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

      if (
        newRow === portalPosition1.row &&
        newCol === portalPosition1.col &&
        currentLevel === 4
      ) {
        newRow = portalPosition11.row;
        newCol = portalPosition11.col;
        updateArrowPosition(newRow, newCol, command.commandType);
      } else if (
        newRow === portalPosition11.row &&
        newCol === portalPosition11.col &&
        currentLevel === 4
      ) {
        newRow = portalPosition1.row;
        newCol = portalPosition1.col;
        updateArrowPosition(newRow, newCol, command.commandType);
      }

      if (
        newRow === portalPosition22.row &&
        newCol === portalPosition22.col &&
        currentLevel === 4
      ) {
        newRow = portalPosition222.row;
        newCol = portalPosition222.col;
        updateArrowPosition(newRow, newCol, command.commandType);
      } else if (
        newRow === portalPosition222.row &&
        newCol === portalPosition222.col &&
        currentLevel === 4
      ) {
        newRow = portalPosition22.row;
        newCol = portalPosition22.col;
        updateArrowPosition(newRow, newCol, command.commandType);
      }

      row = newRow;
      col = newCol;

      setFigurePosition({ row, col });
      pickUpKey(row, col);
      checkChest(row, col);

      await delay(500);
    }

    setCommands([]);
  };

  const handleRiddleInputChange = (e) => {
    setRiddleAnswer(e.target.value);
  };

  /* ... Function for calculatings the commands that are init by the user ---*/
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

    if (
      newCommand.row === portalPosition1.row &&
      newCommand.col === portalPosition1.col &&
      currentLevel === 4
    ) {
      newCommand.row = portalPosition11.row;
      newCommand.col = portalPosition11.col;
      //updateArrowPosition(newCommand.row, newCommand.col, command.commandType);
    } else if (
      newCommand.row === portalPosition11.row &&
      newCommand.col === portalPosition11.col &&
      currentLevel === 4
    ) {
      newCommand.row = portalPosition1.row;
      newCommand.col = portalPosition1.col;
      //updateArrowPosition(newCommand.row, newCommand.col, command.commandType);
    }

    if (
      newCommand.row === portalPosition22.row &&
      newCommand.col === portalPosition22.col &&
      currentLevel === 4
    ) {
      newCommand.row = portalPosition222.row;
      newCommand.col = portalPosition222.col;
      updateArrowPosition(newCommand.row, newCommand.col, command.commandType);
    } else if (
      newCommand.row === portalPosition222.row &&
      newCommand.col === portalPosition222.col &&
      currentLevel === 4
    ) {
      newCommand.row = portalPosition22.row;
      newCommand.col = portalPosition22.col;
      updateArrowPosition(newCommand.row, newCommand.col, command.commandType);
    }

    setCurrentCommandPosition({ row: newCommand.row, col: newCommand.col });
  };

  /* --- Function for check the robot is in the correct position for activate lamp ---*/
  const checkLamp = (row, col) => {
    if (row === lampPosition?.row && col === lampPosition?.col) {
      setLampLit(true);
    } else {
      openModal("Du behöver vara nära lampan för att tända den!");
    }
  };

  /* --- Function for check the robot is in the correct position for activate fruit ---*/
  const checkFruit = (row, col) => {
    if (row === fruitPosition?.row && col === fruitPosition?.col) {
      setFruitEaten(true);
    } else {
      openModal("Du behöver vara nära frukten för att äta den!");
    }
  };

  useEffect(() => {
    //console.log("CMD Pos Row", currentCommandPosition.row, "CMD Pos Col:", currentCommandPosition.col);
    //console.log("Figure Pos Row", figurePosition.row, "Figure Pos Col:", figurePosition.col);
  }, [currentCommandPosition, figurePosition]);

  const handleCommandClick = (command) => {
    calculateCommands(command);
  };

  /* --- Function for check the robot/user forfil the requirements for completing the level ---*/
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
    openModal,
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      {(currentLevel === 1 || currentLevel === 2) && (
        <h2>Tänd lampan, ät äpplet och gå till flaggan!</h2>
      )}
      {currentLevel === 3 && (
        <h2>Tänd lampan, ät äpplet, hämta nyckeln och gå till flaggan!</h2>
      )}
      {currentLevel === 4 && (
        <h2>Använd portalerna för att nå till flaggan!</h2>
      )}
      {currentLevel === 5 && <h2>TBD</h2>}

      <div className="top-game-container">
        <div
          id="game-container"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 50px)`,
            gridTemplateRows: `repeat(${numRows}, 50px)`,
            width: `${numCols * 50}px`,
            height: `${numRows * 50}px`,
            position: "relative",
            borderBottom: "1px solid black",
            backgroundColor: "#E7E7E7",
            backgroundImage:
              "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 0px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        >
          <Robot position={figurePosition} withKey={robotWithKey} />
          {lampPosition && <Lamp position={lampPosition} lit={lampLit} />}
          {fruitPosition && (
            <Fruit position={fruitPosition} eaten={fruitEaten} />
          )}
          {flagPosition && <Flag position={flagPosition} />}
          {chestPosition && <Chest position={chestPosition} />}
          {doorPosition && currentLevel === 3 && (
            <Door position={doorPosition} />
          )}
          {keyPosition && currentLevel === 3 && <Key position={keyPosition} />}
          {portalPosition.map((position, index) => (
            <Portal key={index} position={position} />
          ))}
          {portalPosition2.map((position, index) => (
            <Portal2 key={index} position={position} />
          ))}
          {wallPosition.map((position, index) => (
            <Wall key={index} position={position} />
          ))}
          {displayedCommands.map((command, index) => {
            if (
              command.commandType === "light" ||
              command.commandType === "eat"
            ) {
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
        <div className="level-button-container">
          <button
            onClick={() => {
              firstLevel();
              setCurrentLevel(1);
            }}
            className={`level-button ${
              currentLevel === 1 ? "active-button" : ""
            }`}
          >
            Nivå 1
          </button>
          <button
            onClick={() => {
              secondLevel();
              setCurrentLevel(2);
            }}
            className={`level-button ${
              currentLevel === 2 ? "active-button" : ""
            }`}
          >
            Nivå 2
          </button>
          <button
            onClick={() => {
              thirdLevel();
              setCurrentLevel(3);
            }}
            className={`level-button ${
              currentLevel === 3 ? "active-button" : ""
            }`}
          >
            Nivå 3
          </button>
          <button
            onClick={() => {
              fourthLevel();
              setCurrentLevel(4);
            }}
            className={`level-button ${
              currentLevel === 4 ? "active-button" : ""
            }`}
          >
            Nivå 4
          </button>
          <button
            onClick={() => {
              fifthLevel();
              setCurrentLevel(5);
            }}
            className={`level-button ${
              currentLevel === 5 ? "active-button" : ""
            }`}
          >
            Nivå 5
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Modal"
        className={"game-modal"}
        overlayClassName={"game-modal-overlay"} // Add this for the overlay
      >
        <h2>{modalContent}</h2>
        {showRiddleInput && (
          <div>
            <input
              type="text"
              value={riddleAnswer}
              onChange={handleRiddleInputChange}
              placeholder="Skriv ditt svar här"
            />
            <button onClick={handleRiddleSubmit}>Skicka</button>
          </div>
        )}
        {!modalContent.includes("Välkommen till") && !showRiddleInput && (
          <button onClick={closeModal}>Spela igen!</button>
        )}
      </Modal>

      {/* Command options */}
      <div id="command-container" style={{ marginTop: "20px" }}>
        <button
          onClick={() => handleCommandClick("up")}
          className="command-button"
        >
          Gå Upp
          <FontAwesomeIcon icon={faArrowUp} />
        </button>

        <button
          onClick={() => handleCommandClick("down")}
          className="command-button"
        >
          Gå Ner
          <FontAwesomeIcon icon={faArrowDown} />
        </button>

        <button
          onClick={() => handleCommandClick("left")}
          className="command-button"
        >
          Gå Vänster
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <button
          onClick={() => handleCommandClick("right")}
          className="command-button"
        >
          Gå Höger
          <FontAwesomeIcon icon={faArrowRight} />
        </button>

        <button
          onClick={() => handleCommandClick("light")}
          disabled={
            !(
              currentCommandPosition?.row === lampPosition?.row &&
              currentCommandPosition?.col === lampPosition?.col
            )
          }
          className="command-button command-button--special"
        >
          Tänd Lampa
          <FontAwesomeIcon icon={faLightbulb} />
        </button>

        <button
          onClick={() => handleCommandClick("eat")}
          disabled={
            !(
              currentCommandPosition?.row === fruitPosition?.row &&
              currentCommandPosition?.col === fruitPosition?.col
            )
          }
          className="command-button command-button--special"
        >
          Ät Äpple
          <FontAwesomeIcon icon={faAppleAlt} />
        </button>
      </div>

      <div className="other-button-container">
        <button
          onClick={() => {
            goToLandingPage();
          }}
          className="homepage-button"
        >
          Gå till startsidan
        </button>

        <button
          onClick={() => {
            executeCommands();
          }}
          className="run-button"
        >
          Kör!
        </button>

        <button
          onClick={() => {
            resetGame();
          }}
          className="clear-button"
        >
          Rensa Kommandon
        </button>
      </div>
    </div>
  );
};
