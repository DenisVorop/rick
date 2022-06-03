import React from 'react';
import { useStore } from 'effector-react';

import Season from '../../components/Season/Season';
import ImageTop from '../../components/ImageTop/ImageTop';

import $store, { getEpisodes } from '../../store/store';

import ricknmorty from '../../assets/images/episodes.svg'

import './seasons.scss'

const Seasons: React.FC = () => {
    const store = useStore($store);

    const [seasons, setSeasons] = React.useState<Array<string>>([])

    React.useEffect(() => {
        getEpisodes("https://rickandmortyapi.com/api/episode?page=")
    }, [])

    React.useEffect(() => {
        if (store.episodes) {
            const data: Array<string> = []
            for (let i = 0; i < store.episodes.length; i++) {
                if (!data.includes(store.episodes[i].episode.substring(2, 3))) {
                    data.push(store.episodes[i].episode.substring(2, 3))
                }
            }
            setSeasons(data)
        }
    }, [store.episodes])

    return (
        <div className="seasons">
            <div className="seasons__container">
                <ImageTop
                    image={ricknmorty}
                />
                <div className='seasons__body'>
                    {seasons.map((season: string) => (
                        <Season
                            key={season}
                            season={season}
                            episodes={store.episodes}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Seasons
