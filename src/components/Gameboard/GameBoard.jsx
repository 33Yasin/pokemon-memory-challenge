import React, { useEffect, useState, useRef } from 'react';
import CardGrid from '../CardGrid/CardGrid';
import './GameBoard.css';
import correctSound from '../../assets/correct-sound.wav';
import failSound from '../../assets/fail-sound.wav';

const TOTAL_CARDS = 12;
const MAX_POKEMON_ID = 151;
const CARDS_TO_CHANGE = 5;
const CARDS_TO_SHUFFLE = 6;

function getRandomIds(excludeIds = [], count = 1) {
  const ids = new Set();
  while (ids.size < count) {
    const randId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    if (!excludeIds.includes(randId)) {
      ids.add(randId);
    }
  }
  return [...ids];
}

const GameBoard = ({ score, setScore, highestScore, setHighestScore, gameOver, setGameOver }) => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [clickedIds, setClickedIds] = useState([]);

  // Sesler için ref
  const correctAudioRef = useRef(null);
  const failAudioRef = useRef(null);

  useEffect(() => {
    // Yeni oyun başlat
    const ids = getRandomIds([], TOTAL_CARDS);
    setPokemonIds(ids);
    setSelectedCardId(null);
    setClickedIds([]);
    setGameOver(false);
  }, []);

  const handleCardClick = (id) => {
    if (gameOver) return;
    if (selectedCardId === null) {
      // İlk seçimde de kartlar değişsin ve tüm kartlar shuffle edilsin, skor artmasın
      const otherIds = pokemonIds.filter(pid => pid !== id);
      const toChange = [];
      while (toChange.length < CARDS_TO_CHANGE) {
        const idx = Math.floor(Math.random() * otherIds.length);
        const chosen = otherIds[idx];
        if (!toChange.includes(chosen)) toChange.push(chosen);
      }
      const newIds = getRandomIds([...pokemonIds], CARDS_TO_CHANGE);
      let updatedIds = pokemonIds.map(pid => {
        const changeIdx = toChange.indexOf(pid);
        if (changeIdx !== -1) {
          return newIds[changeIdx];
        }
        return pid;
      });
      // Tüm kartları shuffle et
      updatedIds = shuffleArray(updatedIds);
      setPokemonIds(updatedIds);
      setSelectedCardId(id);
      setClickedIds([id]);
      setScore(0);
      if (correctAudioRef.current) {
        correctAudioRef.current.currentTime = 0;
        correctAudioRef.current.play();
      }
      return;
    }
    if (clickedIds.includes(id)) {
      // Oyun bitti
      setGameOver(true);
      if (score > highestScore) {
        setHighestScore(score);
        localStorage.setItem('highestScore', score);
      }
      if (failAudioRef.current) {
        failAudioRef.current.currentTime = 0;
        failAudioRef.current.play();
      }
      return;
    }
    // Doğru seçim
    setScore(score + 1);
    const newClicked = [...clickedIds, id];
    // 1. Seçili kart hariç kalanlardan 5 tanesini değiştir
    const otherIds = pokemonIds.filter(pid => pid !== id);
    const toChange = [];
    while (toChange.length < CARDS_TO_CHANGE) {
      const idx = Math.floor(Math.random() * otherIds.length);
      const chosen = otherIds[idx];
      if (!toChange.includes(chosen)) toChange.push(chosen);
    }
    // Yeni id'ler üret
    const newIds = getRandomIds([...pokemonIds], CARDS_TO_CHANGE);
    let updatedIds = pokemonIds.map(pid => {
      const changeIdx = toChange.indexOf(pid);
      if (changeIdx !== -1) {
        return newIds[changeIdx];
      }
      return pid;
    });
    // Tüm kartları shuffle et
    updatedIds = shuffleArray(updatedIds);
    setPokemonIds(updatedIds);
    setSelectedCardId(id);
    setClickedIds(newClicked);
    if (correctAudioRef.current) {
      correctAudioRef.current.currentTime = 0;
      correctAudioRef.current.play();
    }
  };

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const handleRestart = () => {
    const ids = getRandomIds([], TOTAL_CARDS);
    setPokemonIds(ids);
    setSelectedCardId(null);
    setClickedIds([]);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="game-board">
      {/* Sesler için audio elementleri */}
      <audio ref={correctAudioRef} src={correctSound} preload="auto" />
      <audio ref={failAudioRef} src={failSound} preload="auto" />
      {gameOver && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(255,255,255,0.92)', zIndex: 10
        }}>
          <div style={{
            fontFamily: 'VT323, monospace',
            fontSize: '2.5rem',
            color: '#c00',
            marginBottom: '18px',
            textAlign: 'center',
            letterSpacing: '1px',
            textShadow: '0 2px 8px #fff, 0 1px 0 #eee'
          }}>
            Oyun bitti!
          </div>
          <div style={{
            fontFamily: 'VT323, monospace',
            fontSize: '1.7rem',
            color: '#222',
            marginBottom: '32px',
            textAlign: 'center',
            letterSpacing: '1px'
          }}>
            Skorunuz: {score}
          </div>
          <button
            onClick={handleRestart}
            style={{
              fontFamily: 'VT323, monospace',
              fontSize: '1.4rem',
              padding: '14px 44px',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
              color: '#fff',
              boxShadow: '0 2px 12px rgba(25,118,210,0.10)',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              fontWeight: 700,
              letterSpacing: '1px',
              outline: 'none',
              marginTop: '8px',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Yeniden Başlat
          </button>
        </div>
      )}
      <CardGrid 
        pokemonIds={pokemonIds} 
        onCardClick={handleCardClick} 
        selectedCardId={selectedCardId}
        disabled={gameOver}
      />
    </div>
  );
};

export default GameBoard;
