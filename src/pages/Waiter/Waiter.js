import { React, useContext, useEffect, useState } from 'react'

import './Waiter.css'
import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../../components/UI/LoggedProfile/Profile'
import Desk from '../../components/UI/Desk/Desk'

// const DeskList = [[1, 0], [4, 1], [45, 3], [2, 3], [12, 2], [33, 1], [7, 2], [19, 0], [26, 3], [41, 2], [50, 1]]

function Waiter({ onToggleSidebar }) {
  const [allDesks, setAllDesks] = useState([]);

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
        const allDesks = data.map(formattedData)
        setAllDesks(allDesks)
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
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
        {allDesks.map((item) => (
          <Desk key={item.id} deskData={item} />
        ))}
      </div>
    </div>
  )
}

export default Waiter;