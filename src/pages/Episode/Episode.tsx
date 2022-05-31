import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

import $store, { getEpisode, removeEpisode } from '../../store/store';
import { TCharacter, TEpisode } from '../../types/types';

import './episode.scss'

interface EpisodeProps { }

const Episode: React.FC<EpisodeProps> = () => {
    const navigate = useNavigate()
    const params = useParams()
    const store = useStore($store);
    const episode: TEpisode = store.episode

    const [characters, setCharacters] = React.useState<TCharacter[]>([])

    React.useEffect(() => {
        getEpisode(Number(params.id))

        return () => {
            removeEpisode()
        }
    }, [])

    React.useEffect(() => {
        episode.characters?.forEach(url => {
            fetch(url)
                .then(req => req.json())
                .then(character => {
                    setCharacters(prev => [...prev, character])
                })
        })
    }, [episode])

    const openCharacter = (id: number) => {
        navigate(`/characters/${id}`)
    }

    return (
        <div className="episode">
            <div className="episode__container">
                <div className="episode__body">
                    <div className="episode__info">
                        <div className="episode__title">{episode.name}</div>
                        <div className="episode__number">{episode.episode?.substring(4, 6)}</div>
                    </div>
                    <div className="episode__date">{episode.air_date}</div>
                    <div className="episode__characters">
                        {characters.map(character => (
                            <div
                                className="episode__character"
                                key={`${episode.name}_${character.id}`}
                                onClick={() => openCharacter(character.id)}
                            >
                                <div><img src={character.image} alt={character.image} /></div>
                                <div>{character.name}</div>
                                <div>{character.gender}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Episode
