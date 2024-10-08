import { useState } from "react"
import "./challenge-view.scss"

import { useNavigate } from "react-router-dom";
import { Hard } from "../../Components/challenges/hard/Hard";
import { Symbols } from "../../Components/symbols/Symbols";
import { Illustration } from "../../Assets/illustrations/illustrations";




export const ChallengeHard = () => {

const [isFinished, setIsFinished] = useState(false);

const [startEasyCss, setStartEasyCss] = useState(false);
const [startEasyHtml, setStartEasyHtml] = useState(false);

const [displaySymbols, setDisplaySymbols] = useState(true);

console.log(startEasyCss, startEasyHtml)




const navigate = useNavigate();

  return (
    <div className="challenge-easy">
      {displaySymbols === true ? (
        <Symbols showJS={true} />
      ) : (null)}
      <>
      {!isFinished ? (
        <Hard /> 
      ) : (
        <div className="done-container">
        <div className="illustrations">
        <Illustration.Thumbs/>
        <Illustration.Hand />
        <Illustration.HandHeart />
        </div>
        <h2>SNYGGT JOBBAT!</h2>
      </div>
      )}
      </>
     
         
               
       
         <div className="button-container">
           
            <button className="back" onClick={() => navigate("/")}>TILLBAKA</button>
            <button className="done" onClick={() => { setDisplaySymbols(false); setIsFinished(true)}}>KLAR</button>
       
        </div>  
        </div> 
  
  )
}