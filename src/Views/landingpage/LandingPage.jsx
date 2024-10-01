import { useNavigate } from "react-router-dom"
import "./landing-page.scss"
import { Icon } from "../../Assets/icons/Icons";

export const LandingPage = () => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/challenge-easy');
  }

  const handleGameNavigation = () => {
    window.location.href = '/lightbot/lightbot.html'; 
  }


  return (
    <div className="landing-page">
      <h1 className="heading">HEEEYAAAH! Välkommen till årets CODE CHALLENGE!</h1>
      <div className="challange-wrapper">
        <div className="challange-easy" onClick={handleNavigation}>
          <div className="inner">
            <h2 className="title">Titel</h2>
            <p className="description">Kort beskrivning</p>
            <p className="age">7+</p></div>
        </div>
        <div className="challange-hard">
        <div className="inner">
        <h2 className="title">Titel</h2>
        <p className="description">Kort beskrivning</p>
        <p className="age">10+</p>
        </div>
        </div>
        <div className="challange-game">
        <div className="inner">
        <h2 className="title">Vill du spela istället?</h2>
        <p className="description">Kort beskrivning</p>
        <button onClick={handleGameNavigation}>Till spelet <Icon.Link /></button>
        <p className="age">7-99+</p>
        </div>
        </div>
      </div>
    </div>
  )
}