import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getUserData } from "../../../firebase.js";

import ViewUserInfo from ".//ViewUserMemberTab.js";
import ViewAdminUserInfo from ".//ViewUserMemberTabAdmin.js";
import userIcon from "./assets/profile.png";
import deleteIcon from "./assets/delete.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "./UserViewMemberList.css";

const UserViewMemberList = ({ userData }) => {
  const [isUserInfoPopup, setUserInfoPopup] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState([]);

  useEffect(() => {
    getUserData()
      .then((loggedUserData) => {
        // Access and use the userData here
        // console.log(userData);
        setLoggedUserData(loggedUserData);
      })
      .catch((error) => {
        console.error(error);
      })
  })

  const handleOpenProfile = () => {
    setUserInfoPopup(!isUserInfoPopup)
  }

  return (
    <div className="user-view-member-list">
      <div className="user-profile-container-parent">
        <div className="user-profile-container" id="user_profile_container">
          <img
            className="user-image-memebers-view"
            alt=""
            src={userData.profileImage}
          />
          <div className="user-name-member">{userData.firstName} {userData.lastName}</div>
          <b className="phone-number-member">{`+ ${userData.phoneNumber}`}</b>
        </div>
        <DropdownButton
          className="profile-info"
          title=""
          size="sm"
          variant="primary"
          align="start"
          drop="down"
        >
          <Dropdown.Item onClick={handleOpenProfile}>
            <img src={userIcon}></img>
            View Profile
          </Dropdown.Item>
          {loggedUserData.role === "ADMIN" ?
            <ViewAdminUserInfo user={userData} showPopup={isUserInfoPopup} onClose={handleOpenProfile} />
          :
            <ViewUserInfo user={userData} showPopup={isUserInfoPopup} onClose={handleOpenProfile} />
          }
          <Dropdown.Item>
            <img src={deleteIcon}></img>
            Delete
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default UserViewMemberList;
