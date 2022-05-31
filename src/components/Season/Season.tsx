import React from 'react';
import { TEpisode } from '../../types/types';
import EpisodeRow from '../EpisodeRow/EpisodeRow';

import './season.scss'

interface SeasonProps {
    season: string
    episodes: TEpisode[]
}

const Season: React.FC<SeasonProps> = ({ season, episodes }) => {
    return (
        <div className='season__wrapper'>
            <div className="season__top">
                <div className="season__title">{season} Season</div>
                <div className="season__search">
                    <input type="text" placeholder='Search episode' />
                </div>
                <div className="season__sort">
                    <input type="text" placeholder='sort by' />
                </div>
            </div>
            <div className="season__body">
                {episodes.map((episode: TEpisode) => {
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
