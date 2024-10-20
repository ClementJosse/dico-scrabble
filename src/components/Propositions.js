// src/components/Proposition.js
import React from 'react';
import { data } from '../data';
import ScrabbleWordList from './ScrabbleWordList';
import './Propositions.css';

function Proposition({ inputValue }) {
  // Si inputValue est vide, on le remplace par "a"
  const searchValue = inputValue === '' ? 'a' : inputValue;

  // Filtrer les mots qui commencent par searchValue
  const filteredWords = data.filter((word) => word.startsWith(searchValue)).slice(0, 15);

  // Si aucun mot n'est trouvé, ne rien afficher
  if (filteredWords.length === 0) {
    return null;
  }

  return (
    <div className="propositions-list"> 
      <ul>
        {filteredWords.map((word, index) => (
          <li className="propositions-elem" key={index}><ScrabbleWordList word={word}/></li>
        ))}
      </ul>
    </div>
  );
}

export default Proposition;
