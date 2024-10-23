import React, { useState, useEffect, useRef } from 'react'; 
import { liste_mots } from './liste_mots';
import './DicoScrabble.css';
import ValidationBox from './components/ValidationBox';
import Score from './components/Score';
import DefinitionDisplay from './components/DefinitionDisplay'; // Import du composant
import Proposition from './components/Propositions';
import Footer from './components/Footer';

function DicoScrabble() {
  const [inputValue, setInputValue] = useState('');
  const [isWordValid, setIsWordValid] = useState(null);
  const [dictionary, setDictionary] = useState(null); // État pour stocker le dictionnaire
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  // Charger le fichier JSON de manière asynchrone
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await fetch('https://cjosse.com/dicoscrabble/dico.json');
        const data = await response.json();
        setDictionary(data);
        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error('Erreur lors du chargement du dictionnaire:', error);
        setLoading(false); // Fin du chargement même en cas d'erreur
      }
    };

    loadDictionary();
  }, []);

  const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const removeSpecialCharacters = (str) => str.replace(/[^a-zA-Z]/g, '');

  const handleInputChange = (event) => {
    let value = event.target.value.toLowerCase();
    let valueWithoutAccents = removeAccents(value);
    let cleanedValue = removeSpecialCharacters(valueWithoutAccents);

    setInputValue(cleanedValue);
    if (cleanedValue !== '') {
      const isValid = liste_mots.includes(cleanedValue);
      setIsWordValid(isValid);
    } else {
      setIsWordValid(null);
    }
  };

  const handleClearInput = () => {
    setInputValue('');
    setIsWordValid(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleWordClick = (word) => {
    setInputValue(word);
    setIsWordValid(liste_mots.includes(word));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  if (loading) {
    return (
      <div className="loading">
        Chargement du dictionnaire...
      </div>
    );
  }

  return (
    <div>
      <div className='main'>
        <h1 className='header'>Dico Scrabble</h1>
        <ValidationBox isWordValid={isWordValid} word={inputValue} />
        <Score isWordValid={isWordValid} word={inputValue} />
        <p className='asterisque'>* basé sur l’ODS 9 du 1er janvier 2024</p>
        <div className='input-wrapper'>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Rechercher un mot..."
            className={`input-text ${isWordValid === null ? '' : isWordValid ? 'valid' : 'invalid'}`}
          />
          {inputValue && <button className="clear-button" onClick={handleClearInput}>✕</button>}
        </div>
        {isWordValid && dictionary && (
          <DefinitionDisplay word={inputValue} dictionary={dictionary} />
        )}
        <Proposition inputValue={inputValue} onWordClick={handleWordClick} />
      </div>
      <Footer />
    </div>
  );
}

export default DicoScrabble;
