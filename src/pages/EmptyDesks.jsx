import React, { useEffect, useState } from 'react'

import toggleIcon from '../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../components/UI/LoggedProfile/Profile'
import Desk from '../components/UI/Desk/Desk'

const DeskList = [[1, 0], [19, 0], [26, 0]]


function EmptyDesks({ onToggleSidebar }) {
  const [emptyDesks, setemptyDesks] = useState([]);

  useEffect(() => {
    setemptyDesks(DeskList);
  }, [])
  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>

      <div className='container'>
        {emptyDesks.map((desk, status) => (
          <Desk key={status} value={desk} />
        ))}
      </div>
    </div>
  )
}

export default EmptyDesks
