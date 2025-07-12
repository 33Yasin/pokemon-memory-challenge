import React from 'react';
import GameBoard from './components/Gameboard/GameBoard';


function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
      <h1 style={{ textAlign: 'center', margin: '10px 0 0 0', fontSize: '2rem', fontFamily: 'VT323, monospace' }}>Pokémon Memory Game</h1>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
