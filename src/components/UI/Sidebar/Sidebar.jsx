import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUserData } from "../../../firebase";

import './Sidebar.css'

import logo from './assets/logo.png';
import home from './assets/icons/home.png'
import members from './assets/icons/users.png'
import emptyDesk from "./assets/icons/emptyDesk.png"
import Payment from "./assets/icons/payment.png"
import Clock from "../Reservation/assets/clock.png"
import Settings from "./assets/icons/settings.png"
import Kitchen from "./assets/icons/kitchen.png"

import Reservation from "../Reservation/AddReservation"

const Sidebar = ({ children }) => {
  const [isReservatonOpen, setReservationOpen] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState([]);

  useEffect(() => {
    getUserData()
      .then((loggedUserData) => {
        setLoggedUserData(loggedUserData);
      })
      .catch((error) => {
        console.error(error);
      })
  })


  // Function to handle modal close
  const handleReservationModal = () => {
    setReservationOpen(!isReservatonOpen);
  };

  const menuItem = [    
    {
      path: '/w',
      name: 'All Desks',
      icon: home
    },
    {
      path: '/kitchen',
      name: 'Kitchen',
      icon: Kitchen
    },
    {
      path: '/empty',
      name: 'Empty Desks',
      icon: emptyDesk
    },
    {
      path: '/payment',
      name: 'Payment',
      icon: Payment
    },
    {
      path: '/members',
      name: 'Members',
      icon: members
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: Settings
    }
  ]
  return (
    <div className="sidebar-frame">
      <a href="/w">
        <img src={logo} alt='' className="logo"></img>
      </a>
      <div className="menu text-white font-size-16">
        {
          // NavLink for pages with path
          menuItem.map((item, index) => (
            (item.name === "All Desks" && loggedUserData.role === "GUEST") ||
            (item.name === "Kitchen" && loggedUserData.role === "GUEST") ||
            (item.name === "Empty Desks" && loggedUserData.role === "GUEST") ||
            (item.name === "Payment" && loggedUserData.role === "GUEST") ||
            (item.name === "Settings" && loggedUserData.role === "GUEST") ||
            (item.name === "Kitchen" && loggedUserData.role === "WAITER") ||
            (item.name === "Settings" && loggedUserData.role === "WAITER") ||
            (item.name === "Settings" && loggedUserData.role === "CHEF")
            ? null : (
            <NavLink to={item.path} key={index} activeClassName="active" >
              <div className="row text-white font-size-16">
                <img src={item.icon} alt='' className="icons"></img>
                {item.name}
              </div>
            </NavLink>
            )
          ))
        }
        {
          (loggedUserData.role === "GUEST") ? <>
          <p className="text-warning">Contact an admin for more...</p>
          </> : 
          <>
          <NavLink to="#" onClick={handleReservationModal}>
            <div className="row text-white font-size-16">
              <img src={Clock} alt='' className="icons"></img>
              Reservation
            </div>
          </NavLink>
          </>
        }
      </div>
      <Reservation showPopup={isReservatonOpen} onClose={handleReservationModal} />
    </div>
  );
}

export default Sidebar;