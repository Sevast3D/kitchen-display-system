import React from 'react'

import './Waiter.css'
import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'

function Waiter({onToggleSidebar }) {
  return (
    <div>
      <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
        <img src={toggleIcon} className="icon"></img>
      </button>
      <h1>Text Simple</h1>
    </div>
    
  );
}

export default Waiter;