import React from 'react';

import { TEpisode } from '../../types/types';

import EpisodeRow from '../EpisodeRow/EpisodeRow';

import useInput from '../../hooks/useInput';

import loop from '../../assets/images/loop.svg'

import './season.scss'

interface SeasonProps {
    season: string
    episodes: TEpisode[]
}

const Season: React.FC<SeasonProps> = ({ season, episodes }) => {
    const { value: seasonSearchValue, bind: seasonSearchBind } = useInput('')

    return (
        <div className='season__wrapper'>
            <div className="season__top">
                <div className="season__title">{season} Season</div>
                <div className="locations__input">
                    <img src={loop} alt="loop" />
                    <input type="text" placeholder='Search episode...'{...seasonSearchBind} />
                </div>
            </div>
            <div className="season__body">
                {episodes
                    .filter((episode: TEpisode) => episode.name.toLowerCase().includes(seasonSearchValue.toLowerCase()))
                    .map((episode: TEpisode) => {
                        if (episode.episode.substring(2, 3) === season)
                            return (
                                <EpisodeRow
                                    key={episode.name}
                                    episode={episode}
                                />
                            )
                        return null
                    })}
            </div>
        </div>
    )
}

export default Season
