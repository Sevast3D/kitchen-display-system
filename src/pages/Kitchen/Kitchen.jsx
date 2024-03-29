import { React, useState } from 'react'

import Profile from '../../components/UI/LoggedProfile/Profile'
import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'

import Desk from './DeskKitchen';
import './Kitchen.css'

function Kitchen({ onToggleSidebar }) {
  const [deskList] = useState([
    [2, "2023-06-10T20:13:23", [[[1, "Pizza", 29.99, "Salam, Ananas, Lipie, Sos"], 0, "Intolerant Lactoza", 2],
                        [[1, "Pizza Small", 29.99, "Lipie, Sos Rosii, Salam"], 1, "", 1],
                        [[2, "Burger", 29.99, "Salam, Ananas, Lipie, Sos"], 0, "Intolerant Lactoza", 2],
                        [[2, "Burger Vita", 29.99, "Salam, Ananas, Lipie, Sos"], 0, "Intolerant Lactoza", 2]
                      ],1],
    [43, "2023-06-10T21:23:23", [[[1, "Salat", 19.99, "Salam, Ananas, Lipie, Sos"], 0, "Intolerant Lactoza", 2]], 0],
    [3, "2023-06-10T21:43:23", [[[1, "Salat", 19.99, "Salam, Ananas, Lipie, Sos"], 0, "Intolerant Lactoza", 2]], 2]
  ]);

  const handleMouseWheel = (event) => {
    event.preventDefault(); // Prevent the default scroll behavior

    // Calculate the amount of scrolling based on the wheel delta
    const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    const container = event.currentTarget;

    // Manually scroll the container
    container.scrollLeft += delta * 40; // Adjust the scrolling speed as needed
  };

  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>
      <div className='flex-start overflow-desks' onWheel={handleMouseWheel}>
        {
          deskList.map((item) => {
            if(item[3] <= 2){
              return <Desk deskData={item} />;
            }
          })
        }
      </div>
    </div>
  )
}

export default Kitchen
