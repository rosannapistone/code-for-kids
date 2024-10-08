import { useState } from "react"
import "./challenge-view.scss"
import { Illustration } from "../../Assets/illustrations/illustrations";
import { Symbols } from "../../Components/symbols/Symbols";
import { useNavigate } from "react-router-dom";
import { EasyCss } from "../../Components/challenges/easy/easy-css/EasyCss";
import { EasyHtml } from "../../Components/challenges/easy/easy-html/EasyHtml";




export const ChallengeEasy = () => {

const [isFinished, setIsFinished] = useState(false);

const [startEasyCss, setStartEasyCss] = useState(false);
const [startEasyHtml, setStartEasyHtml] = useState(false);

const [displaySymbols, setDisplaySymbols] = useState(true);

console.log(startEasyCss, startEasyHtml)




const navigate = useNavigate();

  return (
    <div className="challenge-easy">
      {displaySymbols === true ? (
        <Symbols />
      ) : (null)}
      {!startEasyCss && !startEasyHtml && !isFinished ?
      (

        <div className="challenge-wrapper">
        <div className="css-wrapper">
          <div className="inner">
            <h3>CSS</h3>
            <p>Tre css-utmaningar, lär dig positionering, animering och färgsättning.</p>
            <button className="start-button" onClick={() => {setStartEasyCss(true); setStartEasyHtml(false)}}>STARTA!</button>
          </div>
        </div>
        <div className="html-wrapper">
          <div className="inner">
          <h3>HTML</h3>
          <p>Tre html-utmaningar, lär dig att skapa skelletet, de element som vanligtvis förekommer på en hemsida.</p>
          <button className="start-button" onClick={() => {setStartEasyHtml(true); setStartEasyCss(false)}}>STARTA!</button>
          </div>
        </div>
        </div>
      ) : startEasyCss ? (
          <EasyCss />
        
      ) : startEasyHtml ? (
      
      <EasyHtml /> ) : (
      <div className="done-container">
        <div className="illustrations">
        <Illustration.Thumbs/>
        <Illustration.Hand />
        <Illustration.HandHeart />
        </div>
        <h2>SNYGGT JOBBAT!</h2>
      </div>
      )}
         
               
       
         <div className="button-container">
          {startEasyCss || startEasyHtml ? (
            <>
            <button className="back" onClick={() => {setStartEasyCss(false); setStartEasyHtml(false)}}>TILLBAKA</button>
            <button className="done" onClick={() => {setStartEasyCss(false); setStartEasyHtml(false); setDisplaySymbols(false); setIsFinished(true)}}>KLAR</button>
            </>
          ) : (
            <button className="back" onClick={() => navigate('/')}>TILL STARTSIDAN</button>
          )}
       
        </div>  
        </div> 
  
  )
}