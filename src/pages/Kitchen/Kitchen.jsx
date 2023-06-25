import { React, useState, useEffect } from 'react'

import Profile from '../../components/UI/LoggedProfile/Profile'
import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'

import Desk from './DeskKitchen';
import './Kitchen.css'

function Kitchen({ onToggleSidebar }) {
  const [prepareDesks, setPrepareDesks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllDesks = {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        const response = await fetch(`http://localhost:8080/desks`, getAllDesks)
        if (!response.ok) {
          throw new Error('Failed to get desks data.');
        }
        const data = await response.json();

        function formattedData(desk) {
          return {
            id: desk.id,
            number: desk.number,
            status: desk.status,
            places: desk.places,
            cookingStatus: desk.cookingStatus,
            orderItems: desk.orderItems
          }
        }
        const allDesks = data.filter((item) => item.status === "TAKEN" && item.cookingStatus !== "DONE").map(formattedData)
        setPrepareDesks(allDesks.sort((a, b) => {
          if (a.cookingStatus === "STARTED" && b.cookingStatus !== "STARTED") {
            return -1; // `a` comes before `b`
          } else if (a.cookingStatus !== "STARTED" && b.cookingStatus === "STARTED") {
            return 1; // `b` comes before `a`
          } else {
            return 0; // no sorting needed
          }
        }));
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
  }, [])

  const handleMouseWheel = (event) => {
    // event.preventDefault(); // Prevent the default scroll behavior

    // // Calculate the amount of scrolling based on the wheel delta
    // const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    // const container = event.currentTarget;

    // // Manually scroll the container
    // container.scrollLeft += delta * 40; // Adjust the scrolling speed as needed
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
        {prepareDesks.map((item) => 
          <Desk key={item.id} deskData={item} />
        )}
      </div>
    </div>
  )
}

export default Kitchen
