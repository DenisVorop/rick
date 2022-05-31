import React from 'react';
import { useNavigate } from 'react-router-dom';

import arrowL from '../../assets/images/arrowL.svg'

import './back.scss'

const Back: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="back-body" onClick={() => navigate(-1)}>
            <div className="back-body__arrow">
                <img src={arrowL} alt="arrow-left" />
            </div>
            <div className="back-body__label">Go back</div>
        </div>
    )
}

export default Back
