import { useState } from "react"
import "./challenge-view.scss"

import { useNavigate } from "react-router-dom";
import { SimpleWebsite } from "../../Components/website-challenge/SimpleWebsite";
import { Confetti } from "../../Components/confetti/Confetti";

export const WebsiteChallenge = () => {

const [isFinished, setIsFinished] = useState(false);

const navigate = useNavigate();

  return (
    <div className="challenge">
        <SimpleWebsite />
        {isFinished ? <Confetti /> : null}
         <div className="button-container">  
            <button className="back" onClick={() => {navigate("/"); setIsFinished(false)}}>TILLBAKA</button>
            <button className="done" onClick={() => setIsFinished(true)}>KLAR</button>
        </div>  
        </div>  
  )
}