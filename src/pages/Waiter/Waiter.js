import React from 'react'

import './Waiter.css'
import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../../components/UI/LoggedProfile/Profile'
import Desk from '../../components/UI/Desk/Desk'


const DeskList = [[1, 0], [4, 1], [45, 3], [2, 3], [12, 2], [33, 1], [7, 2], [19, 0], [26, 3], [41, 2], [50, 1]]

function Waiter({ onToggleSidebar }) {
  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>
      
      <div className='container'>
          {DeskList.map((desk, status)=>(
            <Desk key={status} value={desk} />
          ))}
      </div>
    </div>

  );
}

export default Waiter;