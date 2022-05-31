import React from 'react';

import { TLocation } from '../../types/types';

import './locationcard.scss'

interface LocationCardProps {
    location: TLocation
}

const LocationCard: React.FC<LocationCardProps> = ({location}) => {
    return (
        <div className="location-card">
            <div className="location-card__name">{location.name}</div>
            <div className="location-card__type">{location.type ? location.type : 'unknown'}</div>
        </div>
    )
}

export default LocationCard
