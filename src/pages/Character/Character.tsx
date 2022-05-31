import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TCharacter } from '../../types/types';
import $store, { getCharacter, removeCharacter } from '../../store/store';

interface CharacterProps { }

const Character: React.FC<CharacterProps> = () => {
    const params = useParams()
    const store = useStore($store);
    const character: TCharacter = store.character

    React.useEffect(() => {
        getCharacter(Number(params.id))

        return () => {
            removeCharacter()
        }
    }, [])

    return (
        <div>{character?.name}</div>
    )
}

export default Character
