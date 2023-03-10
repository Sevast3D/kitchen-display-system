import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import './Sidebar.css'

import logo from './assets/logo.png';
import home from './assets/icons/home.png'
import members from './assets/icons/users.png'

const Sidebar = ({children}) => {
  // const[isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen (!isOpen);
  const menuItem = [
    {
      path: '/w',
      name: 'Main Page',
      icon: home
    },
    {
      path: '/members',
      name: 'Members',
      icon: members
    }
  ]
  return(
    <span>
    <div className="sidebar-frame">
      <a href="/w">
      <img src={logo} className="logo"></img>
      </a>
      <div className="menu text-white font-size-16">
        {
          menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index}>
              <div className="row">
                <img src={item.icon} className="icons"></img>
                <div className="text-white font-size-16">{item.name}</div>
              </div>
            </NavLink>
          ))
        }
      </div>
      {/* <button onClick={toggle}>Close</button> */}
      {/* <main>{children}</main> */}
    </div>
      <h1 className="menu">Test</h1>
    </span>
  );
}

export default Sidebar;