import { useNavigate } from "react-router-dom";
import "./landing-page.scss";
import { Illustration } from "../../Assets/illustrations/illustrations";

export const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1 className="heading">CODE CHALLENGE!</h1>
      <div className="challange-wrapper">
        <div className="challange-easy"onClick={() => navigate('/challenge-easy')}>
          <div className="inner">
            <h2 className="title">NIVÅ 1</h2>
            <p className="description">Sammanlagt sex utmaningar inom CSS och HTML, enkel nivå - för nybörjare.</p>
            <p className="age"><Illustration.Brain/></p></div>
        </div>
        <div className="challange-hard" onClick={() => navigate('/challenge-hard')}>
        <div className="inner">
        <h2 className="title">NIVÅ 2</h2>
        <p className="description">Bygg din egen ATT-GÖRA-LISTA i CSS, HTML och om du vill: JavaScript.</p>
        <p className="age"><Illustration.Brain/><Illustration.Brain></Illustration.Brain></p>
        </div>
        </div>
        <div className="challange-game" onClick={() => navigate('/games')}>
        <div className="inner">
        <h2 className="title">VILL DU SPELA?</h2>
        <p className="description">Hjälp roboten att hämta flaggan. Glöm inte att utföra uppdragen på vägen!</p>
        </div>
        </div>
      </div>
    </div>
  )
}