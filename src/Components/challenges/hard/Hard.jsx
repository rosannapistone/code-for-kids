import ReactCodepen from "react-codepen-embed";
import { Illustration } from "../../../Assets/illustrations/illustrations";

export const Hard = () => {

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
      </div>
    </div>
  )
}