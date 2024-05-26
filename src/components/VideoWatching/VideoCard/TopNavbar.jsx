import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = () => {
    return (
        <div className="top-navbar">
            <FontAwesomeIcon icon={faTv} className="icon" />
            <div></div>
            <h2>
                <span></span>
            </h2>
            <FontAwesomeIcon icon={faSearch} className="icon" />
        </div>
    );
};

export default TopNavbar;
