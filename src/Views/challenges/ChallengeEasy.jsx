import { useState } from "react"
import "./challenge-easy.scss"
import { Illustration } from "../../Assets/illustrations/illustrations";

export const ChallengeEasy = () => {

const [openChallengeOne, setOpenChallengeOne] = useState(false);
const [openChallengeTwo, setOpenChallengeTwo] = useState(false);
const [openChallengeThree, setOpenChallengeThree] = useState(false);
const [openChallengeFour, setOpenChallengeFour] = useState(false);

  return (
    <div className="challenge-easy">
      Easy Challenge
      <div className="challenge-wrapper">
        <div className="challenge-one">
          <Illustration.Diamond />
        </div>
        {/* <div className="challenge">2</div>
        <div className="challenge">3</div>
        <div className="challenge">4</div> */}
      </div>
    </div>
  )
}