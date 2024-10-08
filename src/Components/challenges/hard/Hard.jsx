
// import { Illustration } from "../../Assets/illustrations/illustrations";
// import CodeSandboxDeployer from "react-codesandboxer";
import ReactCodepen from "react-codepen-embed";

import { useNavigate } from "react-router-dom";
import { Illustration } from "../../../Assets/illustrations/illustrations";




export const Hard = () => {




const navigate = useNavigate();

  return (
    <div className="easy">
      <div className="challenge-wrapper">
            <div className="challenge">
              <div className="inner">
                <div className="instructions">
              <ul>
                <li>UPPGIFT: </li>
                <li>FIL(ER): HTML, CSS (& JAVASCRIPT)</li>
              </ul>
              <Illustration.LightBulbBlue />
              </div>
            <ReactCodepen hash="oNKLrRb" user="rosannapistone" themeId='dark' preview='false' height='600' editable='true' loader={() => <div>Loading...</div>}/>
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