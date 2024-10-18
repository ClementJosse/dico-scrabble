// src/pages/DicoScrabble.js
import React, { useState } from 'react';
import { data } from './data.js'; // Importer les données depuis data.js
import './DicoScrabble.css'; // Un fichier CSS pour le style de la bordure

function DicoScrabble() {
  const [inputValue, setInputValue] = useState('');
  const [isWordValid, setIsWordValid] = useState(null);

  // Fonction pour enlever les accents
  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Fonction appelée à chaque changement dans la zone de texte
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase(); // Convertir en minuscules
    const valueWithoutAccents = removeAccents(value); // Enlever les accents
    setInputValue(value);
    // Vérifier si le mot sans accents est dans la liste
    const isValid = data.includes(valueWithoutAccents);
    setIsWordValid(isValid);
    console.log("Mot sans accents:", valueWithoutAccents, "Est valide:", isValid);
  };
  

  return (
    <div>
      <h1 className='header'>Dico Scrabble</h1>
      <p>* basé sur l’ODS 9 du 1er janvier 2024</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Rechercher un mot..."
        className={`input-text ${isWordValid === null ? '' : isWordValid ? 'valid' : 'invalid'}`}
      />
    </div>
  );
}

export default DicoScrabble;
