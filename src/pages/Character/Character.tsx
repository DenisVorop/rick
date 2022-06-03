import React from 'react';
import { useStore } from 'effector-react';
import { Link, useParams } from 'react-router-dom';

import Back from '../../components/Back/Back';

import { TCharacter, TEpisode } from '../../types/types';

import $store, { getCharacter, removeCharacter } from '../../store/store';

import arrowR from '../../assets/images/arrowR.svg'

import './character.scss'

const Character: React.FC = () => {
    const params = useParams()
    const store = useStore($store);
    const character: TCharacter = store.character
    const [episodes, setEpisodes] = React.useState<TEpisode[]>([] as TEpisode[])

    React.useEffect(() => {
        character.episode?.forEach(url => {
            fetch(url)
                .then(req => req.json())
                .then(episode => {
                    setEpisodes(prev => [...prev, episode])
                })
        })
    }, [character])

    React.useEffect(() => {
        getCharacter(Number(params.id))

        return () => {
            removeCharacter()
        }
    }, [])

    return (
        <div className="character">
            <div className="character__container">
                <div className="character__top">
                    <Back />
                    <div className="character__character">
                        <div className="character__image">
                            <img src={character.image} alt={character.image} />
                        </div>
                        <div className="character__name">{character.name}</div>
                    </div>
                    <div className="character__null"></div>
                </div>
                <div className="character__body">
                    <div className="character__infos">
                        <div className="character__informations">
                            <div className="info-label">Informations</div>
                            <div className="character__row">
                                <div className="row-info">
                                    <div className="label">Gender</div>
                                    <div className="text">{character.gender}</div>
                                </div>
                            </div>
                            <div className="character__row">
                                <div className="row-info">
                                    <div className="label">Status</div>
                                    <div className="text">{character.status}</div>
                                </div>
                            </div>
                            <div className="character__row">
                                <div className="row-info">
                                    <div className="label">Specie</div>
                                    <div className="text">{character.species}</div>
                                </div>
                            </div>
                            <div className="character__row">
                                <div className="row-info">
                                    <div className="label">Origin</div>
                                    <div className="text">{character.origin?.name}</div>
                                </div>
                            </div>
                            <div className="character__row">
                                <div className="row-info">
                                    <div className="label">Type</div>
                                    <div className="text">{character.type ? character.type : 'unknown'}</div>
                                </div>
                            </div>
                            <Link to={`/locations/${character.location?.name}`}>
                                <div className="character__row character-link">
                                    <div className="row-info">
                                        <div className="label">Location</div>
                                        <div className="text">{character.location?.name}</div>
                                    </div>
                                    <div className="row-arrow">
                                        <img src={arrowR} alt="arrowR" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="character__episodes">
                            <div className="info-label">Episodes</div>
                            {episodes.map(episode => (
                                <Link
                                    to={`/episodes/${episode.id}`}
                                    key={episode.name}
                                >
                                    <div className="character__row character-link">
                                        <div className="row-info">
                                            <div className="label">{episode.episode}</div>
                                            <div className="text">{episode.name}</div>
                                            <div className="text character-date">{episode.created.substring(0, 10)}</div>
                                        </div>
                                        <div className="row-arrow">
                                            <img src={arrowR} alt="arrowR" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Character
