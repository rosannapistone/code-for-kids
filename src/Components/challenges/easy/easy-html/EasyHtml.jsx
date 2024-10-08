import ReactCodepen from "react-codepen-embed";
import { Illustration } from "../../../../Assets/illustrations/illustrations";


export const EasyHtml = () => {
  return (
    <div className="easy">
      <div className="challenge-wrapper">
            <div className="challenge">
              <div className="inner">
                <div className="instructions">
              <ul>
                <p>1/3</p>
                <li>UPPGIFT: använd taggarna {'<h1>, <h2> och <h3>'} för att skapa tre olika rubriker</li>
                <li>FIL(ER): HTML</li>
              </ul>
              <Illustration.LightBulbBlue />
              </div>
            <ReactCodepen hash="jOgqXyj" user="rosannapistone" defaultTab='html,result' themeId='dark' preview='false' height='400' editable='true' loader={() => <div>Loading...</div>}/>
            <div className="instructions">
              <ul>
                <p>2/3</p>
                <li>UPPGIFT: skapa en ordnad lista (ordered list) {'<ol>'} och en oordnad lista (unordered list) {'<ul>'}. 
                  <br></br>Fyll den ordnade listan med dina tre favoritfilmer och den oordnade med tre svenska städer.</li>
                <li>FIL(ER): HTML</li>
              </ul>
              <Illustration.LightBulbBlue />
              </div>
            <ReactCodepen hash="jOgqXyj" user="rosannapistone" defaultTab='html,result' themeId='dark' preview='false' height='400' editable='true' loader={() => <div>Loading...</div>}/>
            <div className="instructions">
              <ul>
                <p>3/3</p>
                <li>UPPGIFT: skapa en länk {'<a href="">'} som leder till din förälders arbetsgivares hemsida. </li>
                <li>FIL(ER): HTML</li>
              </ul>
              <Illustration.LightBulbBlue />
              </div>
            <ReactCodepen hash="jOgqXyj" user="rosannapistone" defaultTab='html,result' themeId='dark' preview='false' height='400' editable='true' loader={() => <div>Loading...</div>}/>
              </div>
            </div>
      </div>
    </div>
  )
}