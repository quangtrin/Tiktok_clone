import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, fa7, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function BottomNavbar() {
    return (
        <div className="bottom-navbar">
            <Link className="nav-item">
                <FontAwesomeIcon icon={faHouse} className="icon active" />
                <span className="item-name active">Home</span>
            </Link>
            <Link className="nav-item" to={`/friends`}>
                <FontAwesomeIcon icon={faUserFriends} className="icon" />
                <span className="item-name">Friends</span>
            </Link>
            <Link className="nav-item" to={'/create'}>
                <FontAwesomeIcon icon={faPlus} className="icon plus" />
                <span className="item-name">Create</span>
            </Link>
            <Link className="nav-item" to={'/chat'}>
                <FontAwesomeIcon icon={faInbox} className="icon" />
                <span className="item-name">Inbox</span>
            </Link>
            <Link className="nav-item" to={'/following'}>
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="item-name">Following</span>
            </Link>
        </div>
    );
}

export default BottomNavbar;
