import React from 'react';
import { useStore } from 'effector-react';
import { useParams } from 'react-router-dom';

import Card from '../../components/CharacterCard/CharacterCard';
import Back from '../../components/Back/Back';

import $store, { getLocation, removeLocation } from '../../store/store';

import { TCharacter, TLocation } from '../../types/types';

import './location.scss'

const Location: React.FC = () => {
    const params = useParams()
    const store = useStore($store);
    const location: TLocation = store.location

    const [residents, setResidents] = React.useState<TCharacter[]>([])

    React.useEffect(() => {
        getLocation(params.name!)

        return () => {
            removeLocation()
        }
    }, [])

    React.useEffect(() => {
        location.residents?.forEach(url => {
            fetch(url)
                .then(req => req.json())
                .then(resident => {
                    setResidents(prev => [...prev, resident])
                })
        })
    }, [location])

    return (
        <div className="location">
            <div className="location__container">
                <div className="top">
                    <Back />
                    <div className="title">{location.name}</div>
                    <div className="null"></div>
                </div>
                <div className="info">
                    <div className="episode">
                        <div className="label">Type</div>
                        <div className="text">{location.type}</div>
                    </div>
                    <div className="date">
                        <div className="label">Dimension</div>
                        <div className="text">{location.dimension}</div>
                    </div>
                </div>
                <div className="cast">
                    <div className="info-label">Residents</div>
                    <div className="cards">
                        {residents.map(resident => (
                            <Card
                                key={`${resident.name}_${resident.id}`}
                                character={resident}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location
