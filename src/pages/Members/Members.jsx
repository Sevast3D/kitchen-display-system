import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';

import UserView from "../../components/UI/Members/UserViewMemberList.js"

import "./Members.css"
import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../../components/UI/LoggedProfile/Profile.js'
import { useEffect } from 'react';

function Members({ onToggleSidebar }) {
  // const [allMembers, setAllMembers] = useState([["Cristina", "Constantinescu", "constantinescucristi@gmail.com", "+23123123", "/user-image-memebers-view@2x.png", "1234", 1], ["Alex", "Cristian Ionescu", "exampleemail@gmail.com", "+702311223", "/user-image-memeber2.png", "1234", 3], ["Adelina", "Popescu", "popescuadelina@gmail.com", "+4079021223", "/user-image-memeber3.png", "1234", 2]])
  const [allMembers, setAllMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [chef, setChef] = useState([]);
  const [waiter, setWaiter] = useState([]);
  // const [admins, setAdmins] = useState([["Alex", "Cristian Ionescu", "exampleemail@gmail.com", "+702311223", "/user-image-memeber2.png", "1234", 3]])

  const [activeKey, setActiveKey] = useState('link-0');
  const handleSelect = (eventKey) => setActiveKey(eventKey);

  //await send http setProduct status
  //fetchProducts get from back all products status 
  //fetchDeskStatus get from back desk 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllUsers = {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
        // Get all members
        const response = await fetch('http://localhost:8080/users', getAllUsers)
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        const data = await response.json();

        function formattedData(user) {
          return {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profileImage: user.profileImage,
            role: user.role,
          }
        }

        const allMembers = data.map(formattedData);
        const admins = data.filter((user) => user.role === "ADMIN").map(formattedData);
        const chef = data.filter((user) => user.role === "CHEF").map(formattedData);
        const waiter = data.filter((user) => user.role === "WAITER").map(formattedData);
        setAllMembers(allMembers)
        setAdmins(admins)
        setChef(chef)
        setWaiter(waiter)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>
      <h1>Members</h1>
      <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="link-0"><b className="">All Members</b></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1"><b className="">Admins</b></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2"><b className="">Chief</b></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3"><b className="">Waiter</b></Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="user-list" id="products_container">
        {activeKey === 'link-0' &&
          allMembers.map((item) => (
            <UserView key={item.userId} userData={item} />
          ))
        }
        {activeKey === 'link-1' &&
          admins.map((item) => (
            <UserView key={item.userId} userData={item} />
          ))
        }
        {activeKey === 'link-2' &&
          chef.map((item) => (
            <UserView key={item.userId} userData={item} />
          ))
        }
        {activeKey === 'link-3' &&
          waiter.map((item) => (
            <UserView key={item.userId} userData={item} />
          ))
        }
      </div>
    </div>
  );
}

export default Members;