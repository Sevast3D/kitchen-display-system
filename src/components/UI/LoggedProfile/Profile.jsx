import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './Profile.css'
import profilePic from "./assets/ProfileImage.jpg"
import logout from "./assets/log-out.png"
import user from "./assets/user.png"

function profile() {
  return (
    <div className='profile-view' id="profile_preview">
      <div className='circular-container'>
        <img className='profile-image' src={profilePic} alt=''></img>
      </div>
      <DropdownButton id="dropdown-basic-button" title="Andrei Cristian" variant="outline-secondary">
        <Dropdown.Item href="/w"><img src={user}></img>Account Settings</Dropdown.Item>
        <Dropdown.Item href="/"><img src={logout}></img>Log out</Dropdown.Item>
      </DropdownButton >
    </div >
  )
}

export default profile;
