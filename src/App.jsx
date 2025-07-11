import React from 'react';
import GameBoard from './components/Gameboard/GameBoard';


function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Pokémon Memory Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
