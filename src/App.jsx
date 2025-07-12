import React, { useState, useEffect } from 'react';
import GameBoard from './components/Gameboard/GameBoard';
import pokeballGif from './assets/pokeball.gif';
import pikachuGif from './assets/Pikachu.gif';
import './styles/PikachuRunner.css';

function App() {
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [pokeballPos, setPokeballPos] = useState({ top: 100, left: 100 });
  const [gameOver, setGameOver] = useState(false); // LIFTED STATE

  useEffect(() => {
    const movePokeball = () => {
      const margin = 60; // pokeball boyutu ve kenar boşluğu
      const maxW = window.innerWidth - margin;
      const maxH = window.innerHeight - margin;
      const left = Math.random() * maxW;
      const top = Math.random() * maxH;
      setPokeballPos({ top, left });
    };
    movePokeball();
    const interval = setInterval(movePokeball, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedHigh = localStorage.getItem('highestScore');
    if (storedHigh) setHighestScore(Number(storedHigh));
  }, []);

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(score);
      localStorage.setItem('highestScore', score);
    }
  }, [score, highestScore]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: 0, position: 'relative', overflow: 'hidden' }}>
      {/* Pokeball gif */}
      <img
        src={pokeballGif}
        alt="pokeball"
        style={{
          position: 'fixed',
          top: pokeballPos.top,
          left: pokeballPos.left,
          width: 60,
          height: 60,
          zIndex: 1000,
          pointerEvents: 'none',
          transition: 'top 0.8s cubic-bezier(.4,1.6,.6,1), left 0.8s cubic-bezier(.4,1.6,.6,1)'
        }}
      />
      {/* Pikachu runner at the bottom, only when game is over */}
      {gameOver && (
        <img
          src={pikachuGif}
          alt="pikachu running"
          className="pikachu-runner"
        />
      )}
      <h1 style={{ textAlign: 'center', margin: '10px 0 0 0', fontSize: '2rem', fontFamily: 'VT323, monospace' }}>Pokémon Memory Game</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '10px 0 20px 0', fontFamily: 'VT323, monospace', fontSize: '1.3rem' }}>
        <span>Score: <b>{score}</b></span>
        <span>Highest Score: <b>{highestScore}</b></span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <GameBoard score={score} setScore={setScore} highestScore={highestScore} setHighestScore={setHighestScore} gameOver={gameOver} setGameOver={setGameOver} />
      </div>
    </div>
  );
}

export default App;
