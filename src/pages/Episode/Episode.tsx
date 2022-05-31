import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

import Card from '../../components/CharacterCard/CharacterCard';
import Back from '../../components/Back/Back';

import $store, { getEpisode, removeEpisode } from '../../store/store';

import { TCharacter, TEpisode } from '../../types/types';

import './episode.scss'

interface EpisodeProps { }

const Episode: React.FC<EpisodeProps> = () => {
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

    return (
        <div className="episode">
            <div className="episode__container">
                <div className="episode__body">
                    <div className="top">
                        <Back />
                        <div className="title">{episode.name}</div>
                        <div className="null"></div>
                    </div>
                    <div className="info">
                        <div className="episode">
                            <div className="label">Episode</div>
                            <div className="text">{episode.episode}</div>
                        </div>
                        <div className="date">
                            <div className="label">Date</div>
                            <div className="text">{episode.air_date}</div>
                        </div>
                    </div>
                    <div className="cast">
                        <div className="info-label">Cast</div>
                        <div className="cards">
                            {characters.map(character => (
                                <Card
                                    key={`${character.name}_${character.id}`}
                                    character={character}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Episode
