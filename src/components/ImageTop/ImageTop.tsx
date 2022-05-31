import React from 'react';

import ricknmorty from '../../assets/images/episodes.svg'

interface ImageTopProps {
    image: typeof ricknmorty
}

const ImageTop: React.FC<ImageTopProps> = ({ image }) => {
    return (
        <div className="image-top">
            <img src={image} alt={image} />
        </div>
    )
}

export default ImageTop
