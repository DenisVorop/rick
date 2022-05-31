import React from 'react';
import { TEpisode } from '../../types/types';

import './episoderow.scss'

interface EpisodeRowProps {
    episode: TEpisode
}

const EpisodeRow: React.FC<EpisodeRowProps> = ({ episode }) => {
    return (
        <div className="episode-row">
            <div className="episode-row__body">
                <div className="episode-row__column">#{episode.episode.substring(4, 6)}</div>
                <div className="episode-row__column">{episode.air_date}</div>
                <div className="episode-row__column">{episode.name}</div>
                <div className="episode-row__column">{episode.characters.length}</div>
                <div className="episode-row__btn">
                    ready?
                </div>
            </div>
        </div>
    )
}

export default EpisodeRow
