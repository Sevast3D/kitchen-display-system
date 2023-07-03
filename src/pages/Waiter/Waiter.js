import React from 'react'

import './Waiter.css'
import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../../components/UI/LoggedProfile/Profile'
import Desk from '../../components/UI/Desk/Desk'


const DeskList = [[1, 0], [4, 1], [45, 3], [2, 3], [12, 2], [33, 1], [7, 2], [19, 0], [26, 3], [41, 2], [50, 1]]

function Waiter({ onToggleSidebar }) {
<<<<<<< Updated upstream
=======
  const [allDesks, setAllDesks] = useState([]);
  const currentDate = new Date();

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
            orderItems: desk.orderItems,
            reservations: desk.reservations
          }
        }
        const allDesks = data.map(formattedData)
        setAllDesks(allDesks)
        // console.log(allDesks)

        // const hasTodayReservation = item.reservations.some(reservation => {
        //   const reservationDate = new Date(reservation);
        //   return reservationDate.toDateString() === currentDate.toDateString();
        // });
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
  }, [])

>>>>>>> Stashed changes
  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>
      
      <div className='container'>
<<<<<<< Updated upstream
          {DeskList.map((desk, status)=>(
            <Desk key={status} value={desk} />
          ))}
=======
        {allDesks.map((item) => {
          let reserved = false;
          let time = currentDate;
          if (item.status === "EMPTY" || item.status === "RESERVED") {
            item.reservations.map((reservation) => {
              const reservationDate = new Date(reservation.time);

              const isReserved =
                reservationDate.getFullYear() === currentDate.getFullYear() &&
                reservationDate.getMonth() === currentDate.getMonth() &&
                reservationDate.getDate() === currentDate.getDate();
              if (isReserved) {
                time = reservationDate
                reserved = true; // Update the reserved variable if a reservation is found
              }
            })
            const deskStatus = reserved ? "RESERVED" : item.status;
            async function updateDeskStatus() {
              // 
              try {
                const updateOrderStatus = {
                  method: 'PATCH',
                  headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                  },
                }
                if (reserved) {
                  await fetch(`http://localhost:8080/desks/${parseInt(item.id, 10)}?status=RESERVED`, updateOrderStatus)
                } else {
                  await fetch(`http://localhost:8080/desks/${parseInt(item.id, 10)}?status=EMPTY`, updateOrderStatus)
                }

              }
              catch (error) {
                // Handle the error
                console.error(error);
              }
            }
            updateDeskStatus();

            return <Desk key={item.id} deskData={{ ...item, status: deskStatus }} time={time} />;
          } else {
            time = 0
            return <Desk key={item.id} deskData={item} time={time} />;
          }
        })}
>>>>>>> Stashed changes
      </div>
    </div>

  );
}

export default Waiter;