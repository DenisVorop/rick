import React from 'react';
import { useStore } from 'effector-react';

import useInput from '../../hooks/useInput';
import $store, { getCharacters, removeCharacters } from '../../store/store';

import CharacterCard from '../../components/CharacterCard/CharacterCard';
import ImageTop from '../../components/ImageTop/ImageTop';

import loop from '../../assets/images/loop.svg'
import ricknmorty from '../../assets/images/episodes.svg'

import './characters.scss'


interface CharactersProps { }

const Characters: React.FC = () => {
    const store = useStore($store)
    const characters = store.characters
    const characters_pages = store.characters_pages
    const { value: nameValue, bind: nameBind } = useInput('')

    const [page, setPage] = React.useState(1)
    const [gender, setGender] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>('')

    React.useEffect(() => {
        getCharacters(`https://rickandmortyapi.com/api/character/?page=${page}`)
        return () => {
            removeCharacters()
        }
    }, [])

    React.useEffect(() => {
        if (page < characters_pages!)
            getCharacters(`https://rickandmortyapi.com/api/character/?page=${page}&status=${status}&gender=${gender}`)
    }, [page, status, gender])

    const genders = ['Male', 'Female', 'Genderless', 'Unknown']
    const statuses = ['Alive', 'Dead', 'Unknown']

    return (
        <div className="characters">
            <div className="characters__container">
                <div className="characters__body">
                    <ImageTop
                        image={ricknmorty}
                    />
                    <div className="locations__inputs">
                        <div className="locations__input">
                            <img src={loop} alt="loop" />
                            <input type="text" placeholder='Filter by name...' {...nameBind} />
                        </div>
                        <select className="characters__select" onChange={e => setGender(e.target.value)}>
                            <option
                                className="characters__option"
                                value=' '
                            >
                                All
                            </option>
                            {genders.map(gender => (
                                <option
                                    key={gender}
                                    value={gender}
                                    className="characters__option"
                                >
                                    {gender}
                                </option>
                            ))}
                        </select>
                        <select className="characters__select" onChange={e => setStatus(e.target.value)}>
                            {statuses.map(status => (
                                <option
                                    key={status}
                                    value={status}
                                    className="characters__option"
                                >
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="cards">
                        {characters
                            .filter(character => character.name.toLowerCase().includes(nameValue.toLowerCase()))
                            .map(character => (
                                <CharacterCard
                                    key={`${character.name}_${character.id}`}
                                    character={character}
                                />
                            ))}
                    </div>
                </div>
                <div className="characters__btn">
                    <>
                        {page !== 1 ?
                            <div
                                className="characters__load-more"
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                Prev page
                            </div>
                            : null
                        }
                        {page !== characters_pages ?
                            <div
                                className="characters__load-more"
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next page
                            </div>
                            : null
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default Characters
