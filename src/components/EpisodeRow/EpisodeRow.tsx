import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TEpisode } from '../../types/types';

import './episoderow.scss'

interface EpisodeRowProps {
    episode: TEpisode
}

const EpisodeRow: React.FC<EpisodeRowProps> = ({ episode }) => {
    const navigate = useNavigate()

    return (
        <div className="episode-row">
            <div className="episode-row__body" onClick={() => navigate(`/episodes/${episode.id}`)}>
                <div className="episode-row__episode-number">Serie - #{episode.episode.substring(4, 6)}</div>
                <div className="episode-row__info">
                    <div className="episode-row__name">{episode.name}</div>
                    <div className="episode-row__date">{episode.air_date}</div>
                    <div className="episode-row__characters-info">
                        <div className="episode-row__characters-label">Heroes -  {episode.characters.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EpisodeRow
