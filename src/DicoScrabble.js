import React, { useState, useRef } from 'react';
import { data } from './data'; // Importer les données depuis data.js
import './DicoScrabble.css'; // Un fichier CSS pour le style de la bordure
import ValidationBox from './components/ValidationBox';
import Score from './components/Score';
import Proposition from './components/Propositions';

function DicoScrabble() {
  const [inputValue, setInputValue] = useState('');
  const [isWordValid, setIsWordValid] = useState(null);
  const inputRef = useRef(null); // Créer une référence pour l'input

  // Fonction pour enlever les accents
  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Fonction pour supprimer les caractères spéciaux et les espaces
  const removeSpecialCharacters = (str) => {
    return str.replace(/[^a-zA-Z]/g, ''); // Supprimer tout sauf les lettres
  };

  // Fonction appelée à chaque changement dans la zone de texte
  const handleInputChange = (event) => {
    let value = event.target.value.toLowerCase(); // Convertir en minuscules
    let valueWithoutAccents = removeAccents(value); // Enlever les accents
    let cleanedValue = removeSpecialCharacters(valueWithoutAccents); // Supprimer les caractères spéciaux et les espaces
  
    setInputValue(cleanedValue); // Mettre à jour l'input
    if (cleanedValue !== '') {
      // Si l'input n'est pas vide, vérifier si le mot est dans la liste
      const isValid = data.includes(cleanedValue);
      setIsWordValid(isValid);
    } else {
      // Si l'input est vide, ne pas afficher de validation
      setIsWordValid(null);
    }
  };

  // Fonction pour effacer le texte et remettre le focus sur l'input
  const handleClearInput = () => {
    setInputValue('');
    setIsWordValid(null);
    if (inputRef.current) {
      inputRef.current.focus(); // Remettre le focus sur l'input
    }
  };

  return (
    <div className='main'>
      <h1 className='header'>Dico Scrabble</h1>
      <ValidationBox isWordValid={isWordValid} word={inputValue}/>
      <Score isWordValid={isWordValid} word={inputValue}/>
      <p className='asterisque'>* basé sur l’ODS 9 du 1er janvier 2024</p>
      <div className='input-wrapper'>
        <input
          ref={inputRef} // Ajouter la référence à l'input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Rechercher un mot..."
          className={`input-text ${isWordValid === null ? '' : isWordValid ? 'valid' : 'invalid'}`}
        />
        {inputValue && <button className="clear-button" onClick={handleClearInput}>✕</button>}
      </div>
      <Proposition inputValue={inputValue} />
    </div>
  );
}

export default DicoScrabble;
