import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from 'react';

import ViewUserInfo from ".//ViewUserMemberTab.js";
import userIcon from "./assets/profile.png";
import deleteIcon from "./assets/delete.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "./UserViewMemberList.css";

const UserViewMemberList = ({userData}) => {
  const [isUserInfoPopup, setUserInfoPopup] = useState(false);

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
            src={userData[4]} 
          />
          <div className="user-name-member">{userData[0]} {userData[1]}</div>
          <b className="phone-number-member">{userData[3]}</b>
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
          <ViewUserInfo user={userData} showPopup={isUserInfoPopup} onClose={handleOpenProfile} />
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
