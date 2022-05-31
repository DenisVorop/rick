import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

import $store, { getEpisode, removeEpisode } from '../../store/store';
import { TCharacter, TEpisode } from '../../types/types';

import './episode.scss'
import Back from '../../components/Back/Back';

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
                    <div className="episode__top">
                        <Back />
                        <div className="episode__title">{episode.name}</div>
                        <div className="episode__null"></div>
                    </div>
                    <div className="episode__info">
                        <div className="episode__episode">
                            <div className="label">Episode</div>
                            <div className="text">{episode.episode}</div>
                        </div>
                        <div className="episode__date">
                            <div className="label">Date</div>
                            <div className="text">{episode.air_date}</div>
                        </div>
                    </div>
                    <div className="episode__cast">
                        <div className="info-label">Cast</div>
                        <div className="episode__cards">
                            {characters.map(character => (
                                <div
                                    key={`${episode.name}_${character.id}`}
                                    className="episode__card card-episode"
                                    onClick={() => openCharacter(character.id)}
                                >
                                    <div className="card-episode__image">
                                        <img src={character.image} alt={character.image} />
                                    </div>
                                    <div className="card-episode__info">
                                        <div className="card-episode__name">{character.name}</div>
                                        <div className="card-episode__gender">{character.gender}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Episode
