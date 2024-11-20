import { useState } from 'react';
import { Illustration } from '../../Assets/illustrations/illustrations';
import './style.scss';
import ReactCodepen from 'react-codepen-embed';

export const Html = () => {
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
                <li>
                  UPPGIFT: använd taggarna {'<h1>, <h2> och <h3>'} för att skapa
                  tre olika rubriker
                </li>
                <li>FIL(ER): HTML</li>
              </ul>
              <div className="hint-container">
                {showHintOne ? (
                  <div className="hint">
                    Skriv ner de olika taggarna och fyll dem med tex.
                    Exempelvis: {'<h1>Text</h1>'}
                  </div>
                ) : null}
                <Illustration.LightBulbBlue
                  onClick={() => setShowHintOne((showHintOne) => !showHintOne)}
                />
              </div>
            </div>
            <ReactCodepen
              hash="jOgqXyj"
              user="rosannapistone"
              defaultTab="html,result"
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
                  UPPGIFT: skapa en knapp, {'<button>'}, och fyll den med valfri
                  text.
                </li>
                <li>FIL(ER): HTML</li>
              </ul>
              <div className="hint-container">
                {showHintTwo ? (
                  <div className="hint">
                    Skappa ett button-element:{' '}
                    {'<button>Skriv något här</button>'}
                  </div>
                ) : null}
                <Illustration.LightBulbBlue
                  onClick={() => setShowHintTwo((showHintTwo) => !showHintTwo)}
                />
              </div>
            </div>
            <ReactCodepen
              hash="jOgqXyj"
              user="rosannapistone"
              defaultTab="html,result"
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
                  UPPGIFT: skapa en länk {'<a href="">'} som leder till din
                  förälders arbetsgivares hemsida.{' '}
                </li>
                <li>FIL(ER): HTML</li>
              </ul>
              <div className="hint-container">
                {showHintThree ? (
                  <div className="hint">
                    {'<a href="https://webbadressen">'}
                  </div>
                ) : null}
                <Illustration.LightBulbBlue
                  onClick={() =>
                    setShowHintThree((showHintThree) => !showHintThree)
                  }
                />
              </div>
            </div>
            <ReactCodepen
              hash="jOgjrjb"
              user="rosannapistone"
              defaultTab="html,result"
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
