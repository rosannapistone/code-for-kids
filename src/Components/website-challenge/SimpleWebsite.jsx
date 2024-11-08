import React, { useState } from "react";
import "./simple-website.scss"; // Your CSS file

export const SimpleWebsite = () => {

  // State to hold user inputs for styles
  // HEADER
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("");
  const [headerFontColor, setHeaderFontColor] = useState("");

  // MAIN
  const [mainBackgroundColor, setMainBackgroundColor] = useState("");
  const [mainTitleFontSize, setMainTitleFontSize] = useState("");
  const [mainTitleFontColor, setMainTitleFontColor] = useState("");
  const [mainTitleText, setMainTitleText] = useState("Skapa din egen landningssida!");
  const [mainParagraphFontSize, setMainParagraphFontSize] = useState("");
  const [mainParagraphFontColor, setMainParagraphFontColor] = useState("");
  const [mainParagraphText, setMainParagraphText] = useState("Välj färger, logotyp, text m.m.!");
  const [mainButtonText, setMainButtonText] = useState("Klicka på mig!");
  const [mainButtonColor, setMainButtonColor] = useState("");
  const [mainButtonBackground, setMainButtonBackground] = useState("");
  const [mainButtonBorder, setMainButtonBorder] = useState("");

  // FOOTER
  const [footerBackgroundColor, setFooterBackgroundColor] = useState("");
  const [footerFontColor, setFooterFontColor] = useState("");
  const [footerText, setFooterText] = useState("© 2024 Min hemsida. Kopiering förbjuden.")
  
  
  // State to hold logo image
  const [logoSrc, setLogoSrc] = useState("https://via.placeholder.com/100x50"); // Default placeholder logo

  // Handle input changes for styles
  const handleInputChange = (e, styleType) => {
    const value = e.target.value;
    switch (styleType) {
      case "headerBackgroundColor":
        setHeaderBackgroundColor(value);
        break;
      case "headerFontColor":
        setHeaderFontColor(value);
        break;
      case "mainBackgroundColor":
        setMainBackgroundColor(value);
        break;
      case "footerBackgroundColor":
        setFooterBackgroundColor(value);
        break;
      case "mainTitleFontSize":
        setMainTitleFontSize(value);
        break;
      case "mainTitleFontColor":
          setMainTitleFontColor(value);
          break;
      case "mainTitleText":
        setMainTitleText(value);
        break;
      case "mainParagraphFontSize":
        setMainParagraphFontSize(value);
        break;
      case "mainParagraphFontColor":
        setMainParagraphFontColor(value);
        break;
      case "mainParagraphText":
        setMainParagraphText(value);
        break;
      case "mainButtonColor": 
        setMainButtonColor(value);
        break;
      case "mainButtonText":
        setMainButtonText(value);
        break;
      case "mainButtonBackground":
        setMainButtonBackground(value);
        break;
      case "mainButtonBorder":
        setMainButtonBorder(value);
        break;
      case "footerFontColor":
        setFooterFontColor(value);
        break;
      case "footerText":
        setFooterText(value);
        break;
      default:
        break;
    }
  };

  // Handle image upload for logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoSrc(reader.result); // Set the image source to the uploaded file
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  return (
    <div className="website-container">
      <div className="desktop-border">
        <div className="dot-container">
          <div className="red"></div>
          <div className="yellow"></div>
          <div className="green"></div>
        </div>

        {/* Header */}
        <header
          className="_header"
          style={{backgroundColor: headerBackgroundColor, color: headerFontColor}}
        >
          <img
            src={logoSrc}
            alt="Logo"
            className="logo"
            style={{ height: "3rem", width: "auto" }}
          />
          <nav className="menu">
            <ul>
              <li>Hem</li>
              <li>Om</li>
              <li>Kontakt</li>
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main
          className="main-content"
          style={{background: mainBackgroundColor}}
        >
          <h1 className="title" style={{fontSize: mainTitleFontSize, color: mainTitleFontColor}}>{mainTitleText}</h1>
          <p className="paragraph" style={{fontSize: mainParagraphFontSize, color: mainParagraphFontColor}}>{mainParagraphText}</p>
          <button
            className="main-button"
            style={{color: mainButtonColor, borderColor: mainButtonBorder, backgroundColor: mainButtonBackground, borderRadius: "1rem", border: "solid, 2px"}}
          >
            {mainButtonText}
          </button>
        </main>

        {/* Footer */}
        <footer
          className="footer"
          style={{backgroundColor: footerBackgroundColor, color: footerFontColor}}
        >
          <p>{footerText}</p>
        </footer>
      </div>

      {/* Style Options */}
      <div className="style-container">
        <h2>ANPASSA STILAR</h2>

        {/* Header Style Options */}
        <div className="style-options">
          <h3>Header</h3>
          <div className="header-style-options">
          <div className="style-option">
            <label>Bakgrund:</label>
            <input
              type="text"
              value={headerBackgroundColor}
              onChange={(e) => handleInputChange(e, "headerBackgroundColor")}
              placeholder="Välj en färg på engelska"
            />
          </div>

          <div className="style-option">
            <label>Textfärg:</label>
            <input
              type="text"
              value={headerFontColor}
              onChange={(e) => handleInputChange(e, "headerFontColor")}
              placeholder="Välj en färg på engelska"
            />
          </div>

          {/* Image Upload for Logo */}
          <div className="style-option">
            <label className="logo">Logotyp:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </div>
        </div>
        </div>

        {/* Main Content Style Options */}
        <div className="style-options">
          <h3>Main</h3>
        <div className="main-style-options">
          <div className="style-option">
            <label>Bakgrund:</label>
            <input
              type="text"
              value={mainBackgroundColor}
              onChange={(e) => handleInputChange(e, "mainBackgroundColor")}
              placeholder="Skriv en färg på engelska eller URL till en bild"
            />
          </div>

          <div className="style-option">
            <label>Titelstorlek:</label>
            <input
              type="text"
              value={mainTitleFontSize}
              onChange={(e) => handleInputChange(e, "mainTitleFontSize")}
              placeholder="Skriv ett nummer och en enhet, ex. 1rem eller 16px"
            />
          </div>

          <div className="style-option">
            <label>Undertitelstorlek:</label>
            <input
              type="text"
              value={mainParagraphFontSize}
              onChange={(e) => handleInputChange(e, "mainParagraphFontSize")}
              placeholder="Skriv ett nummer och en enhet, ex. 1rem eller 16px"
            />
          </div>

          <div className="style-option">
            <label>Titelfärg:</label>
            <input
              type="text"
              value={mainTitleFontColor}
              onChange={(e) => handleInputChange(e, "mainTitleFontColor")}
              placeholder="Skriv en färg på engelska"
            />
          </div>

          <div className="style-option">
            <label>Undertitelfärg:</label>
            <input
              type="text"
              value={mainParagraphFontColor}
              onChange={(e) => handleInputChange(e, "mainParagraphFontColor")}
              placeholder="Skriv en färg på engelska"
            />
          </div>

          <div className="style-option">
            <label>Titeltext:</label>
            <input
              type="text"
              value={mainTitleText}
              onChange={(e) => handleInputChange(e, "mainTitleText")}
            />
          </div>

          <div className="style-option">
            <label>Undertiteltext:</label>
            <input
              type="text"
              value={mainParagraphText}
              onChange={(e) => handleInputChange(e, "mainParagraphText")}
            />
          </div>

          {/* Button Style */}
          <div className="style-option">
            <label>Knapptext:</label>
            <input
              type="text"
              value={mainButtonText}
              onChange={(e) => handleInputChange(e, "mainButtonText")}
            />
          </div>

          <div className="style-option">
            <label>Knappfärg:</label>
            <input
              type="text"
              value={mainButtonBackground}
              onChange={(e) => handleInputChange(e, "mainButtonBackground")}
              placeholder="Skriv en färg på engelska"
            />
          </div>

          <div className="style-option">
            <label>Knapptextfärg:</label>
            <input
              type="text"
              value={mainButtonColor}
              onChange={(e) => handleInputChange(e, "mainButtonColor")}
              placeholder="Skriv en färg på engelska"
            />
          </div>

          <div className="style-option">
            <label>Knappramfärg:</label>
            <input
              type="text"
              value={mainButtonBorder}
              onChange={(e) => handleInputChange(e, "mainButtonBorder")}
              placeholder="Skriv en färg på engelska"
            />
          </div>
        </div>
        </div>

        {/* Footer Style Options */}
        <div className="style-options">
          <h3>Footer</h3>
          <div className="footer-style-options">
          <div className="style-option">
            <label>Bakgrund:</label>
            <input
              type="text"
              value={footerBackgroundColor}
              onChange={(e) => handleInputChange(e, "footerBackgroundColor")}
              placeholder="Skriv en färg på engelska"
            />
          </div>

          <div className="style-option">
            <label>Textfärg:</label>
            <input
              type="text"
              value={footerFontColor}
              onChange={(e) => handleInputChange(e, "footerFontColor")}
              placeholder="Skriv en färg på engelska"
            />
          </div>

          <div className="style-option">
            <label>Text:</label>
            <input
              type="text"
              value={footerText}
              onChange={(e) => handleInputChange(e, "footerText")}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};