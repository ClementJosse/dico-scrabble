import React from 'react';
import './ValidationBox.css'; // Un fichier CSS pour le style de la bordure
import ScrabbleWord from './ScrabbleWord';

const ValidationBox = ({ isWordValid, word }) => {
  return (
    <div className={`validation-box ${isWordValid === true ? 'isvalid' : isWordValid === false ? 'notvalid' : ''}`}>
      <div className="word-container">
        <ScrabbleWord word={word} />
      </div>
      {isWordValid !== null && (
        <div className="validation-text">
          {isWordValid ? 'Est valide au Scrabble' : "N'est pas valide au Scrabble"}
        </div>
      )}
    </div>
  );
};

export default ValidationBox;
