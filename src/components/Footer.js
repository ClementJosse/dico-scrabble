import React from 'react';
import { ReactComponent as LinkedinIcon} from '../linkedin.svg'; // Utilisation d'un SVG en tant que composant React
import { ReactComponent as GithubIcon } from '../github.svg'; // Utilisation d'un SVG en tant que composant React
import { ReactComponent as MailIcon } from '../mail.svg'; // Utilisation d'un SVG en tant que composant React
import './Footer.css'; // Un fichier CSS pour le style de la bordure

const copyToClipboard = () => {
    navigator.clipboard.writeText("clement.b.josse@gmail.com")
      .then(() => {
        setTimeout(() => {
        }, 1000); // 1 seconde avant de réinitialiser le message
      })
      .catch((err) => {
        console.error("Erreur lors de la copie dans le presse-papier : ", err);
      });
  };

const ValidationBox = () => {
  return (
    <div className='footer'>
        <div className='star'>
            {"N’hésite pas à ⭐ le projet sur Github ➜ "}
            <GithubIcon className="github-project icon" onClick={() => window.open("https://github.com/ClementJosse/dico-scrabble")}/>
        </div> 
        <div className='clem'>© 2024 · Site créé avec ❤️ par Clément Josse</div>
        <div className='socials'>
            <LinkedinIcon className="social icon" onClick={() => window.open("https://www.linkedin.com/in/clement-josse")}/>
            <GithubIcon className="social icon" onClick={() => window.open("https://github.com/ClementJosse")}/>
            <MailIcon className="social icon" onClick={copyToClipboard}/>
        </div>
    </div>
  );
};

export default ValidationBox;
