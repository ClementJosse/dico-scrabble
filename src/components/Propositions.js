import React from 'react';
import { liste_mots } from '../liste_mots';
import './Propositions.css';

function Proposition({ inputValue }) {
  const searchValue = inputValue === '' ? 'a' : inputValue;

  const filteredWords = liste_mots.filter((word) => word.startsWith(searchValue)).slice(0, 15);

  if (filteredWords.length === 0) {
    return null;
  }

  return (
    <div className="propositions-list">
      {filteredWords != null ? 'Proposition de mots' : ''}
      <ul>
        {filteredWords.map((word, index) => (
          <li className="propositions-elem" key={index}>
              {inputValue === word ? '' : word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Proposition;
