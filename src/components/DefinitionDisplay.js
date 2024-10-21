import React from 'react';
import './DefinitionDisplay.css'; // Fichier CSS pour le style

function DefinitionDisplay({ word, dictionary }) {
  // Trouver le mot et ses définitions dans le JSON
  const wordData = dictionary.find((entry) => entry.mot === word);

  // Si le mot n'est pas trouvé, ne rien afficher
  if (!wordData) {
    return null;
  }

  return (
    <div className="definition-box">
      <div className="definition-text">
        <div className='definition-title'> {word.toUpperCase()}: </div>
        <ul>
            {wordData.def.map((definition, index) => (
              <li key={index}>{definition}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default DefinitionDisplay;
