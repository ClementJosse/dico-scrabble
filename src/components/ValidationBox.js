import React from 'react';
import './ValidationBox.css'; // Un fichier CSS pour le style de la bordure
import ScrabbleWord from './ScrabbleWord';

const ValidationBox = ({ isWordValid, word }) => {
  if (isWordValid === true) {
    return (
      <div className="validation-box isvalid">
        <ScrabbleWord word={word}/>
        Est valide au Scrabble
      </div>
    );
  } else if (isWordValid === false) {
    return (
      <div className="validation-box notvalid">
        <ScrabbleWord word={word}/>
        N'est pas valide au Scrabble
      </div>
    );
  } else {
    return null; // Aucun carré affiché si isWordValid est null
  }
};

export default ValidationBox;
