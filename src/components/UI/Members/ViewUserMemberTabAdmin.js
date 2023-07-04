import { React, useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { writeUserData, getUserData } from '../../../firebase';

import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewUserMemberTabAdmin.css";
import Modal from 'react-bootstrap/Modal';

import noImage from './../LoggedProfile/assets/user-no-image.png'

const ViewUserMemberTabAdmin = ({ user, showPopup, onClose }) => {
  const [userData, setUserData] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roleWaiter, setRoleWaiter] = useState(false);
  const [roleChef, setRoleChef] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState([]);

  useEffect(() => {
    console.log(user)
    // console.log(user.role)
    if (user.role === "ADMIN") {
      setAdmin(true);
    } else if (user.role === "WAITER") {
      setRoleWaiter(true);
    } else if (user.role === "CHEF") {
      setRoleChef(true);
    }
  }, [user])

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (value === "ADMIN") {
      setAdmin(checked);
    } else if (value === "WAITER") {
      setRoleWaiter(checked);
    } else if (value === "CHEF") {
      setRoleChef(checked);
    } else {
      setRoleChef(!checked);
      setRoleWaiter(!checked);
      setAdmin(!checked);
    }
  };


  const handleOnSave = () => {

    if (Admin) {
      user.role = "ADMIN";
    } else if (roleChef) {
      user.role = "CHEF";
    } else if (roleWaiter) {
      user.role = "WAITER";
    } else {
      user.role = "GUEST";
    }

    const updateUserProfile = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify({
        role: user.role
      }),
    }
    // console.log(user.role)

    fetch(`http://localhost:8080/users/${user.userId}`, updateUserProfile)
      .then(res => {
        if (res.ok) {

          return res.json();
        } else {
          console.log("Update User Failed!");
        }
      })
      .catch(error => {
        console.error(error);
      });
    window.location.reload()
  }

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered >
      <div className="view-user-member-tab-admin">
        <div className="main-container" id="products_container">
          <div className="left-side-contrainer">
            {user.profileImage === null || user.profileImage === undefined ?
              <img className="user-image-view-user" alt="" src={noImage} /> :
              <img className="user-image-view-user" alt="" src={user.profileImage} />
            }
          </div>
          <div className="user-info">
            <div className="username-container">
              <div className="username-text">User Name</div>
              <div className="usernameid">{`${user.firstName} ${user.lastName}`}</div>
            </div>
            <div className="phone-container">
              <div className="username-text">Phone Number</div>
              <div className="phone">{`+${user.phoneNumber}`}</div>
            </div>
            <div className="phone-container">
              <div className="username-text">Email</div>
              <div className="phone">{user.email}</div>
            </div>
          </div>
        </div>
        <div className="phone-container">
          <div className="username-text">Roles</div>
          <div className="select-roles-container">
            <Form.Check label="Waiter" type="checkbox" value="WAITER" inline checked={roleWaiter} onChange={handleCheckboxChange} />
            <Form.Check label="Chef" type="checkbox" value="CHEF" inline checked={roleChef} onChange={handleCheckboxChange} />
            <Form.Check label="Admin" type="checkbox" value="ADMIN" inline checked={Admin} onChange={handleCheckboxChange} />
          </div>
        </div>
        <div className="flex-start gap-10">
          <button className="close-btn-user-view" onClick={onClose}>
            <div className="close">Close</div>
          </button>
          <button className="close-btn-user-view" onClick={handleOnSave}>
            <div className="close">Save</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserMemberTabAdmin;
