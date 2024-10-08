import { useState } from "react"
import { Icon } from "../../Assets/icons/Icons"
import { Illustration } from "../../Assets/illustrations/illustrations"
import { Logo } from "../../Assets/logos/logos"
import "./symbols.scss"

export const Symbols = ({showJS}) => {

  const [show, setShow] = useState(true);


  return (    
    <div className="symbols-container">
    
      {!show ? (
        <Icon.Info onClick={() => setShow(true)}/>
      ) : (
        <Icon.Close onClick={() => setShow(false)} />
      )}
      {show ? (<div className="symbols">
        <div className="inner">
        <div className="light-bulb">
        <Illustration.LightBulbBlue />
        <h4>GLÖDLAMPAN</h4>
        <p>Glödlampan ger tips och hjälp om ni fastnar i kodutmaningarna. Den finns tillgänglig i alla utmaningar.</p>
        </div>
        <div className="css">
        <Logo.CSS className="css-icon" />
        <h4>CSS</h4>
        <p>CSS är ett språk som gör hemsidor fina. Det bestämmer färg, storlek och var saker ska vara.</p>
        <a href="https://www.w3schools.com/css/default.asp" target="_blank">Läs mer om CSS</a>
        </div>
        <div className="html">
        <Logo.HTML className="html-icon"/>
        <h4>HTML</h4>
        <p>HTML är som ett skelett för hemsidor. Det bestämmer vad som ska finnas, som text och bilder.</p>
        <a href="https://www.w3schools.com/html/default.asp" target="_blank">Läs mer om HTML</a>
        </div>
        {showJS === true ? (
           <div className="javascript">
          <Logo.JS className="js-icon"/>
          <h4>JAVASCRIPT</h4>
          <p>JavaScript är hjärnan för hemsidor. Det gör så saker kan hända, som att knappar fungerar och spel kan spelas.</p>
          <a href="https://www.w3schools.com/js/default.asp" target="_blank">Läs mer om JavaScript</a>
          </div> 
        )
      : null}
       
          </div>
          </div>) : (null)}
          
       
          </div>
  
)
}