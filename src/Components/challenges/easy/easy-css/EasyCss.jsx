import { useState } from "react"
import "../easy.scss"
// import { Illustration } from "../../Assets/illustrations/illustrations";
// import CodeSandboxDeployer from "react-codesandboxer";
import ReactCodepen from "react-codepen-embed";

import { useNavigate } from "react-router-dom";
import { Symbols } from "../../../symbols/Symbols";
import { Illustration } from "../../../../Assets/illustrations/illustrations";




export const EasyCss = () => {

const [openChallenges, setOpenChallenges] = useState(false);
const [openChallengeTwo, setOpenChallengeTwo] = useState(false);
const [openChallengeThree, setOpenChallengeThree] = useState(false);
const [openChallengeFour, setOpenChallengeFour] = useState(false);
const [isFinished, setIsFinished] = useState(false);

const [start, setStart] = useState(true);




const navigate = useNavigate();

  return (
    <div className="easy">
      <div className="challenge-wrapper">
            <div className="challenge">
              <div className="inner">
                <div className="instructions">
              <ul>
                <p>1/3</p>
                <li>UPPGIFT: flytta diamanten till det nedre högra hörnet</li>
                <li>FIL(ER): CSS</li>
              </ul>
              <Illustration.LightBulbBlue />
              </div>
            <ReactCodepen hash="gOVPzMQ" user="rosannapistone" themeId='dark' preview='false' height='400' editable='true' loader={() => <div>Loading...</div>}/>
            <div className="instructions">
              <ul>
                <p>2/3</p>
                <li>UPPGIFT: få yin och yangen att snurra åt höger istället för vänster</li>
                <li>FIL(ER): CSS</li>
              </ul>
              <Illustration.LightBulbBlue />
              </div>
            <ReactCodepen hash="mdNPExM" user="rosannapistone" themeId='dark' preview='false' height='400' editable='true' loader={() => <div>Loading...</div>}/>
            <div className="instructions">
              <ul>
                <p>3/3</p>
                <li>UPPGIFT: ändra den nedre regnbågens färger så den ser ut som den övre.
                  <br></br>
                  Använd färgerna: röd, orange, gul, grön, blå, indigo och violett.   </li>
                <li>FIL(ER): CSS</li>
              </ul>
              <Illustration.LightBulbBlue />
              </div>
            <ReactCodepen hash="VwoajOz" user="rosannapistone" themeId='dark' preview='false' height='400' editable='true' loader={() => <div>Loading...</div>}/>
              </div>
            </div>
       
     
        {/* <div className="button-container">
        <button className="back" onClick={() => navigate('/')}>TILLBAKA</button>
        {openChallenges ? 
        (
          <button className="next">NÄSTA UTMANING</button>

        ) : null}
       
        </div> */}

      </div>
    </div>
  )
}