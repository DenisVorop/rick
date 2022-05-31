import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg'

import './header.scss'

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__body">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="header__navbar">
                        <div className="header__links">
                            <div className="header__link"><Link to={'/'}>Episodes</Link></div>
                            <div className="header__link"><Link to={'/locations'}>Locations</Link></div>
                            <div className="header__link"><Link to={'/characters'}>Characters</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
