import React from 'react'


import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'

function Members({onToggleSidebar}) {
  return (
    <div>
      <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
        <img src={toggleIcon} className="icon"></img>
        </button>
      <h1>Registered Members</h1>
    </div>
  );
}

export default Members;