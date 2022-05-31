import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TCharacter } from '../../types/types';

import './charactercard.scss'

interface CharacterCardProps {
    character: TCharacter
}

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
    const navigate = useNavigate()

    return (
        <div
            className="character-card"
            onClick={() => navigate(`/characters/${character.id}`)}
        >
            <div className="character-card__image">
                <img src={character.image} alt={character.image} />
            </div>
            <div className="character-card__info">
                <div className="character-card__name">{character.name}</div>
                <div className="character-card__gender">{character.gender}</div>
            </div>
        </div>
    )
}

export default CharacterCard
