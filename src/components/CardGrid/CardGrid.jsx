import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import './CardGrid.css'

const CardGrid = ({ pokemonIds }) => {
    return (
        <div className="card-grid">
            {pokemonIds.map((id) => (
                <PokemonCard key={id} id={id} />
            ))}
        </div>
    )
}

export default CardGrid