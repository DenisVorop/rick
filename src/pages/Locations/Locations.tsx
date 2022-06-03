import React from 'react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import useScroll from '../../hooks/useScroll';

import ImageTop from '../../components/ImageTop/ImageTop';
import LocationCard from '../../components/LocationCard/LocationCard';

import $store, { getLocations, removeLocations } from '../../store/store';

import loop from '../../assets/images/loop.svg'
import ricknmorty from '../../assets/images/locations.svg'

import './locations.scss'

const Locations: React.FC = () => {
    const store = useStore($store)
    const locations = store.locations
    const locations_pages = store.locations_pages
    const { value: nameValue, bind: nameBind } = useInput('')
    const { value: typeValue, bind: typeBind } = useInput('')
    const { value: dimensionValue, bind: dimensionBind } = useInput('')

    const [page, setPage] = React.useState(1)
    const parentRef = React.useRef<HTMLDivElement>(null)
    const childRef = React.useRef<HTMLDivElement>(null)

    const intersected = useScroll(parentRef, childRef, () => fetchLocations(page.toString()))

    React.useEffect(() => {
        getLocations(`https://rickandmortyapi.com/api/location?page=${page}`)
        setPage(prev => prev + 1)

        return () => {
            removeLocations()
        }
    }, [])

    function fetchLocations(page: string) {
        if (locations_pages && +page <= locations_pages) {
            getLocations(`https://rickandmortyapi.com/api/location?page=${page}`)
            setPage(prev => prev + 1)
        }
    }

    return (
        <div className="locations" ref={parentRef}>
            <div className="locations__container">
                <div className="locations__body">
                    <ImageTop
                        image={ricknmorty}
                    />
                    <div className="locations__inputs">
                        <div className="locations__input">
                            <img src={loop} alt="loop" />
                            <input type="text" {...nameBind} placeholder='Filter by name...' />
                        </div>
                        <div className="locations__input">
                            <img src={loop} alt="loop" />
                            <input type="text" {...typeBind} placeholder='Filter by type...' />
                        </div>
                        <div className="locations__input">
                            <img src={loop} alt="loop" />
                            <input type="text" {...dimensionBind} placeholder='Filter by dimension...' />
                        </div>
                    </div>
                    <div className="locations__cards">
                        {locations
                            .filter(location => location.name.toLowerCase().includes(nameValue.toLowerCase()))
                            .filter(location => location.type.toLowerCase().includes(typeValue.toLowerCase()))
                            .filter(location => location.dimension.toLowerCase().includes(dimensionValue.toLowerCase()))
                            .map(location => (
                                <Link
                                    key={location.name}
                                    to={`/locations/${location.name}`}
                                >
                                    <LocationCard
                                        location={location}
                                    />
                                </Link>
                            ))}
                        <div ref={childRef} style={{ height: 20, background: 'green', opacity: 0 }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Locations
