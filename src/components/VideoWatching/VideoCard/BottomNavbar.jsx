import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, fa7,faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function BottomNavbar() {
  const navigate = useNavigate()
  const handleClickCreate = () =>{
    navigate("/create")
  } 
  return (
      <div className="bottom-navbar">
        <div className="nav-item">
          <FontAwesomeIcon icon={faHouse} className="icon active" />
          <span className="item-name active">Home</span>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faUserFriends} className="icon" />
          <span className="item-name">Friends</span>
        </div>
        <div className="nav-item" onClick={handleClickCreate}>
          <FontAwesomeIcon icon={faPlus} className="icon plus" />
          <span className="item-name">Create</span>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={fa7} className="notification" />
          <FontAwesomeIcon icon={faInbox} className="icon" />
          <span className="item-name">Inbox</span>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="item-name">Profile</span>
        </div>
      </div>
  );
}

export default BottomNavbar;
