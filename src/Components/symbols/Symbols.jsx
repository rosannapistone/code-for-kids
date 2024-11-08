import { useState } from 'react';
import { Icon } from '../../Assets/icons/Icons';
import { Illustration } from '../../Assets/illustrations/illustrations';
import { Logo } from '../../Assets/logos/logos';
import './symbols.scss';

export const Symbols = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="symbols-container">
      {!show ? (
        <div className="icon-target-area" onClick={() => setShow(true)}>
          <Icon.Info />
        </div>
      ) : (
        <div className="icon-target-area" onClick={() => setShow(false)}>
          <Icon.Close />
        </div>
      )}
      {show ? (
        <div className="symbols">
          <div className="inner">
            <div className="light-bulb">
              <Illustration.LightBulbBlue />
              <h4>GLÖDLAMPAN</h4>
              <p>
                Glödlampan ger tips och hjälp om du fastnar i kodutmaningarna.
              </p>
            </div>
            <div className="css">
              <Logo.CSS className="css-icon" />
              <h4>CSS</h4>
              <p>
                CSS är ett språk som gör hemsidor fina. Det bestämmer färg,
                storlek och var saker ska vara.
              </p>
              <a
                href="https://www.w3schools.com/css/default.asp"
                target="_blank"
                rel="noreferrer"
              >
                Läs mer om CSS
              </a>
            </div>
            <div className="html">
              <Logo.HTML className="html-icon" />
              <h4>HTML</h4>
              <p>
                HTML är som ett skelett för hemsidor. Det bestämmer vad som ska
                finnas, som text och bilder.
              </p>
              <a
                href="https://www.w3schools.com/html/default.asp"
                target="_blank"
                rel="noreferrer"
              >
                Läs mer om HTML
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
