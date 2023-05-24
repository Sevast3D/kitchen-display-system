import { useEffect, useState} from 'react'

import toggleIcon from '../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../components/UI/LoggedProfile/Profile'
import Desk from '../components/UI/Desk/Desk'

const DeskList = [[1, 1], [19, 1], [26, 2]]

function ForPayments({onToggleSidebar}) {
  const [paymentDesks, setpaymentDesks] = useState([]);

  useEffect(() => {
    setpaymentDesks(DeskList);
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
        {paymentDesks.map((desk, status) => (
          <Desk key={status} value={desk} />
        ))}
      </div>
    </div>
  )
}

export default ForPayments
