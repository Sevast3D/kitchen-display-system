import { React, useState } from "react";
import { NavLink } from "react-router-dom";

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
            <NavLink
              to={item.path}
              key={index}
              activeClassName="active"
            >
              <div className="row text-white font-size-16">
                <img src={item.icon} alt='' className="icons"></img>
                {item.name}
              </div>
            </NavLink>
          ))
        }
        {
          // Nav Link for simple Popups */
          <NavLink to="#" onClick={handleReservationModal}>
            <div className="row text-white font-size-16">
              <img src={Clock} alt='' className="icons"></img>
              Reservation
            </div>
          </NavLink>
        }
      </div>
      <Reservation showPopup={isReservatonOpen} onClose={handleReservationModal} />
    </div>
  );
}

export default Sidebar;