import { useState } from 'react';
import { Illustration } from '../../Assets/illustrations/illustrations';
import './style.scss';
import ReactCodepen from 'react-codepen-embed';

export const Css = () => {
  const [showHintOne, setShowHintOne] = useState(false);
  const [showHintTwo, setShowHintTwo] = useState(false);
  const [showHintThree, setShowHintThree] = useState(false);
  return (
    <div className="code-challenge">
      <div className="challenge-wrapper">
        <div className="challenge">
          <div className="inner">
            <div className="instructions">
              <ul>
                <p>1/3</p>
                <li>UPPGIFT: flytta diamanten till det nedre högra hörnet</li>
                <li>FIL(ER): CSS</li>
              </ul>
              <div className="hint-container">
                {showHintOne ? (
                  <div className="hint">
                    Blommans position har nu top: 0 och left: 0, för att ändra
                    positionen ersätt top och left till bottom och right.
                  </div>
                ) : null}
                <div
                  className="icon-target-area"
                  onClick={() => setShowHintOne((showHintOne) => !showHintOne)}
                >
                  <Illustration.LightBulbBlue />
                </div>
              </div>
            </div>
            <ReactCodepen
              hash="gOVPzMQ"
              user="rosannapistone"
              themeId="dark"
              preview="false"
              height="400"
              editable="true"
              loader={() => <div>Loading...</div>}
            />
            <div className="instructions">
              <ul>
                <p>2/3</p>
                <li>
                  UPPGIFT: få yin och yangen att snurra åt höger istället för
                  vänster
                </li>
                <li>FIL(ER): CSS</li>
              </ul>
              <div className="hint-container">
                {showHintTwo ? (
                  <div className="hint">
                    Yin och yangen roterar nu från -360deg, alltså -360 grader,
                    för att den ska ändra riktigt behöver graderna ändras till
                    ett plusvärde.
                  </div>
                ) : null}
                <div
                  className="icon-target-area"
                  onClick={() => setShowHintTwo((showHintTwo) => !showHintTwo)}
                >
                  <Illustration.LightBulbBlue />
                </div>
              </div>
            </div>
            <ReactCodepen
              hash="mdNPExM"
              user="rosannapistone"
              themeId="dark"
              preview="false"
              height="400"
              editable="true"
              loader={() => <div>Loading...</div>}
            />
            <div className="instructions">
              <ul>
                <p>3/3</p>
                <li>
                  UPPGIFT: ändra den nedre regnbågens färger så den liknar den
                  övre.
                  <br></br>
                </li>
                <li>
                  <a
                    href="https://www.w3.org/wiki/CSS/Properties/color/keywords"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lista på färger
                  </a>
                </li>
                <li>FIL(ER): CSS</li>
              </ul>
              <div className="hint-container">
                {showHintThree ? (
                  <div className="hint">
                    Ändra namnet på färgerna som anges vid box-shadow. Kom ihåg
                    att färgerna måste skrivas på engelska.
                  </div>
                ) : null}
                <div
                  className="icon-target-area"
                  onClick={() =>
                    setShowHintThree((showHintThree) => !showHintThree)
                  }
                >
                  <Illustration.LightBulbBlue />
                </div>
              </div>
            </div>
            <ReactCodepen
              hash="VwoajOz"
              user="rosannapistone"
              themeId="dark"
              preview="false"
              height="400"
              editable="true"
              loader={() => <div>Loading...</div>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
