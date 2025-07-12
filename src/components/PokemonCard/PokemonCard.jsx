import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css'

const PokemonCard = ({ id, onClick, selected, disabled }) => {

    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetcPokemonData = async () => {
            try {
                const [pokemonRes, speciesRes] = await Promise.all([
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
                    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
                ]);
                setPokemon(pokemonRes.data);
                setSpecies(speciesRes.data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetcPokemonData();
    }, [id]);

    if (loading) return <div className="pokemon-card loading">Loading...</div>;
    if (!pokemon || !species) return <div className="pokemon-card error">Data not available.</div>;

    const image = pokemon.sprites.other['official-artwork'].front_default;
    const name = pokemon.name;
    const baseExp = pokemon.base_experience;

    const attackStat = pokemon.stats.find((stat) => stat.stat.name === 'attack')?.base_stat || 'N/A';
    const defenseStat = pokemon.stats.find((stat) => stat.stat.name === 'defense')?.base_stat || 'N/A';

    const mainType = pokemon.types[0].type.name;
    const typeColors = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };
    const badgeBg = typeColors[mainType] || '#ffd700';

    // badgeBg'den soft bir arka plan rengi üret
    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
      }
      const num = parseInt(hex, 16);
      return [num >> 16, (num >> 8) & 255, num & 255];
    }
    function blendWithWhite(hex, percent) {
      const rgb = hexToRgb(hex);
      const blend = rgb.map(c => Math.round(c + (255 - c) * percent));
      return `rgb(${blend[0]}, ${blend[1]}, ${blend[2]})`;
    }
    const cardBg = blendWithWhite(badgeBg, 0.7); // %70 beyaz karışımı, soft pastel

    const gif = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;

    return (
        <div>
            <div 
              className={`pokemon-card${selected ? ' selected' : ''}`} 
              style={{ background: cardBg, cursor: disabled ? 'not-allowed' : 'pointer', outline: selected ? '' : 'none', opacity: disabled ? 0.6 : 1 }}
              onClick={() => !disabled && onClick && onClick(id)}
              tabIndex={disabled ? -1 : 0}
            >
                <div className="base-exp-badge" style={{ background: badgeBg }}>EXP: {baseExp}</div>
                <h2 className="pokemon-name">{name.toUpperCase()}</h2>
                <img src={image} alt={name} className='pokemon-image' />
                {gif && <img src={gif} alt={name + ' gif'} className='pokemon-gif' />}
                <div className="pokemon-stats-bottom">
                  <div className="stat-item attack" style={{ background: badgeBg }}>
                    <div className="stat-circle">
                      <span className="stat-label">A</span>
                      <span className="stat-value">{attackStat}</span>
                    </div>
                  </div>
                  <div className="stat-item defense" style={{ background: badgeBg }}>
                    <div className="stat-circle">
                      <span className="stat-label">D</span>
                      <span className="stat-value">{defenseStat}</span>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard