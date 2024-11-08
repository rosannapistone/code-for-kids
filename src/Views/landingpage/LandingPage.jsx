import { useNavigate } from "react-router-dom";
import "./landing-page.scss";
import { Illustration } from "../../Assets/illustrations/illustrations";
import { Confetti } from "../../Components/confetti/Confetti";

export const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1 className="heading">CODE CHALLENGE!</h1>
      <div className="challange-wrapper">
      <div className="website-challenge" onClick={() => navigate('/website-challenge')}>
        <div className="inner">
        <h2 className="title">SKAPA DIN EGEN HEMSIDA!</h2>
        <p className="description">Ändra färger, storlekar, innehåll och ladda upp en egen logotyp för att göra sidan mer personlig. 
        Fyll i fälten och se magin hända direkt!
        </p>
        <p className="age"><Illustration.Brain/></p>
        </div>
        </div>
        <div className="code-challenge"onClick={() => navigate('/code-challenge')}>
          <div className="inner">
            <h2 className="title">6 UTMANINGAR INOM CSS & HTML!</h2>
            <p className="description">Klarar du alla utmaningar? Testa dina färdigheter i CSS och HTML.</p>
            <p className="age"><Illustration.Brain/><Illustration.Brain/></p></div>
        </div>
        <div className="game-challenge" onClick={() => navigate('/games')}>
        <div className="inner">
        <h2 className="title">VILL DU SPELA?</h2>
        <p className="description">Följ med roboten på en spännande resa och hjälp den genom olika utmaningar! 
          Tänk logiskt, lös problem och ta dig fram till målet – det blir inte lätt, men du klarar det!</p>
        </div>
        </div>
      </div>
    </div>
  )
}