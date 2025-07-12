import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import './CardGrid.css'

const CardGrid = ({ pokemonIds, onCardClick, selectedCardId, disabled }) => {
    return (
        <div className="card-grid">
            {pokemonIds.map((id) => (
                <PokemonCard 
                  key={id} 
                  id={id} 
                  onClick={() => onCardClick(id)}
                  selected={selectedCardId === id}
                  disabled={disabled}
                />
            ))}
        </div>
    )
}

export default CardGrid