import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TEpisode } from '../../types/types';

import './episoderow.scss'

interface EpisodeRowProps {
    episode: TEpisode
}

const EpisodeRow: React.FC<EpisodeRowProps> = ({ episode }) => {
    const navigate = useNavigate()

    const openEpisode = () => {
        navigate(`/episodes/${episode.id}`)
    }

    return (
        <div className="episode-row">
            <div className="episode-row__body">
                <div className="episode-row__column" onClick={openEpisode}>#{episode.episode.substring(4, 6)}</div>
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
