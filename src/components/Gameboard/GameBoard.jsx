import React, { useEffect, useState } from 'react';
import CardGrid from '../CardGrid/CardGrid';
import './GameBoard.css';

const TOTAL_CARDS = 12;
const MAX_POKEMON_ID = 151;

const GameBoard = () => {
  const [pokemonIds, setPokemonIds] = useState([]);

  useEffect(() => {
    generateRandomPokemonIds();
  }, []);

  const generateRandomPokemonIds = () => {
    const ids = new Set();
    while (ids.size < TOTAL_CARDS) {
      const randId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
      ids.add(randId);
    }
    setPokemonIds([...ids]);
  };

  return (
    <div className="game-board">
      <CardGrid pokemonIds={pokemonIds} />
    </div>
  );
};

export default GameBoard;
