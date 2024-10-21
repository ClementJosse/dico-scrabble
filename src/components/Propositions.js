import React from 'react';
import { liste_mots } from '../liste_mots';
import './Propositions.css';
import { ReactComponent as ExportIcon } from '../export.svg'; // Utilisation d'un SVG en tant que composant React

function Proposition({ inputValue, onWordClick }) {
  // Ne fait rien si inputValue est vide
  if (inputValue === '') {
    return null;
  }

  const searchValue = inputValue.toLowerCase();
  
  // Filtrer les mots qui commencent par inputValue, mais ne sont pas identiques à inputValue
  const filteredWords = liste_mots
    .filter((word) => word.startsWith(searchValue) && word !== searchValue)
    .slice(0, 15);

  // Ne pas afficher la section s'il n'y a pas de mots correspondant
  if (filteredWords.length === 0) {
    return null;
  }

  return (
    <div className="propositions-list">
      <p className="asterisque">Proposition de mots:</p>
      <ul>
        {filteredWords.map((word, index) => {
          // Extraire la partie du mot qui correspond à inputValue
          const matchPart = word.slice(0, inputValue.length);
          const remainingPart = word.slice(inputValue.length);

          return (
            <li className="propositions-elem" key={index} onClick={() => onWordClick(word)}>
              <span className="icon-wrapper">
                <ExportIcon className="icon" />
              </span>
              {" " + matchPart.toUpperCase()}
              <strong>{remainingPart.toUpperCase()}</strong> {/* Partie restante en gras */}
            </li>)
        })}
      </ul>
    </div>
  );
}

export default Proposition;
