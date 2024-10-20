import React from 'react';
import './ScrabbleWord.css'; // Importer le fichier CSS pour le style

// Tableau de scores pour les lettres du Scrabble
const letterScores = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 10,
  L: 1, M: 2, N: 1, O: 1, P: 3, Q: 8, R: 1, S: 1, T: 1, U: 1, V: 4,
  W: 10, X: 10, Y: 10, Z: 10
};

const ScrabbleWord = ({ word }) => {
  const letters = word.split('').map((letter, index) => {
    const upperLetter = letter.toUpperCase();
    const score = letterScores[upperLetter] || 0; // Obtenir le score de la lettre, 0 si lettre inconnue
    return (
      <div key={index} className="scrabble-tile">
        {upperLetter}
        <span className="letter-score">{score}</span>
      </div>
    );
  });

  // Si le mot a plus de 9 lettres, appliquer la classe 'scrabble-word-long'
  const wordClass = word.length > 9 ? 'scrabble-word-long' : word.length < 9 ? 'scrabble-word': 'scrabble-word8';


  return <div className={wordClass}>{letters}</div>;
};

export default ScrabbleWord;
