import React from 'react'


import UserView from "../../components/UI/Members/UserViewMemberList.js"


import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../../components/UI/LoggedProfile/Profile'

function Members({ onToggleSidebar }) {
  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>
      <h1>Members</h1>
      <div className='container'>
        <UserView />
        <UserView />
        <UserView />
      </div>
    </div>
  );
}

export default Members;