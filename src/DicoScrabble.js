import React, { useState, useEffect, useRef } from 'react'; 
import { liste_mots } from './liste_mots';
import './DicoScrabble.css';
import ValidationBox from './components/ValidationBox';
import Score from './components/Score';
import DefinitionDisplay from './components/DefinitionDisplay';
import Proposition from './components/Propositions';
import Footer from './components/Footer';
import ScrollAnimation from './components/ScrollAnimation.tsx';

// Import the SVGs
import S from './S.svg';

function DicoScrabble() {
  const [inputValue, setInputValue] = useState('');
  const [isWordValid, setIsWordValid] = useState(null);
  const [dictionary, setDictionary] = useState(null);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // State for letter index

  // List of letter SVGs
  const letters = [S];

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await fetch('https://dicoscrabble.cjosse.com/dico.json');
        const data = await response.json();
        setDictionary(data);
        setLoading(false); 
      } catch (error) {
        console.error('Erreur lors du chargement du dictionnaire:', error);
        setLoading(false);
      }
    };

    loadDictionary();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinning-letter">
          <div className="scrabble-tile">
          S
          <span className="letter-score">1</span>
          </div>
        </div>
        <p>Chargement du dictionnaire...</p>
      </div>
    );
  }

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
        <div className='loading-letter'>
          <img src={letters[currentLetterIndex]} alt="loading letter" />
        </div>
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
        <ScrollAnimation translateX={0} translateY={-20} speed="0.2s">
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
        </ScrollAnimation>
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
