import React from "react";
import { NavLink } from "react-router-dom";

import './Sidebar.css'

import logo from './assets/logo.png';
import home from './assets/icons/home.png'
import members from './assets/icons/users.png'

const Sidebar = ({ children }) => {
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
  return (
    <div className="sidebar-frame">
      <a href="/w">
        <img src={logo} alt='' className="logo"></img>
      </a>
      <div className="menu text-white font-size-16">
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index}>
              <div className="row">
                <img src={item.icon} alt='' className="icons"></img>
                <div className="text-white font-size-16">{item.name}</div>
              </div>
            </NavLink>
          ))
        }
      </div>
    </div>
  );
}

export default Sidebar;