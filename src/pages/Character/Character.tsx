import React from 'react';
import { useParams } from 'react-router-dom';
import { TCharacter } from '../../types/types';

interface CharacterProps { }

const Character: React.FC<CharacterProps> = () => {
    const [character, setCharacter] = React.useState<TCharacter>()
    const params = useParams()

    React.useEffect(() => {
            fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
                .then(req => req.json())
                .then(character => {
                    setCharacter(character)
        })
    }, [])

    return (
        <div>{character?.name}</div>
    )
}

export default Character
