import { useState } from "react"
import "./challenge-view.scss"
import { Symbols } from "../../Components/symbols/Symbols";
import { useNavigate } from "react-router-dom";
import { Css } from "../../Components/code-challenges/Css";
import { Html } from "../../Components/code-challenges/Html";
import { Confetti } from "../../Components/confetti/Confetti";

export const CodeChallenge = () => {
const [isFinished, setIsFinished] = useState(false);
const [startCss, setStartCss] = useState(false);
const [startHtml, setStartHtml] = useState(false);
const [displaySymbols, setDisplaySymbols] = useState(true);

const navigate = useNavigate();

  return (
    <div className="challenge">
      {displaySymbols === true ? (
        <Symbols />
      ) : (null)}
      {!startCss && !startHtml ?
      (

        <div className="challenge-wrapper">
        <div className="css-wrapper">
          <div className="inner">
            <h3>CSS</h3>
            <p>Tre css-utmaningar, lär dig positionering, animering och färgsättning.</p>
            <button className="start-button" onClick={() => {setStartCss(true); setStartHtml(false)}}>STARTA!</button>
          </div>
        </div>
        <div className="html-wrapper">
          <div className="inner">
          <h3>HTML</h3>
          <p>Tre html-utmaningar, lär dig att skapa skelletet, de element som vanligtvis förekommer på en hemsida.</p>
          <button className="start-button" onClick={() => {setStartHtml(true); setStartCss(false)}}>STARTA!</button>
          </div>
        </div>
        </div>
      ) : startCss ? (
          <Css />
      ) : startHtml ? (
      <Html /> ) : null
      
      }
      {(startCss || startHtml) && isFinished ? <Confetti /> : null}
  
               
       
         <div className="button-container">
          {startCss || startHtml ? (
            <>
            <button className="back" onClick={() => {setStartCss(false); setStartHtml(false); setIsFinished(false)}}>TILLBAKA</button>
            <button className="done" onClick={() => { setDisplaySymbols(false); setIsFinished(true)}}>KLAR</button>
            </>
          ) : (
            <button className="back" onClick={() => navigate('/')}>TILL STARTSIDAN</button>
          )}
       
        </div>  
        </div> 
  
  )
}