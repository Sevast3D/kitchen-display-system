import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from 'react';

import ViewUserInfo from ".//ViewUserMemberTab.js";
import userIcon from "./assets/profile.png";
import deleteIcon from "./assets/delete.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "./UserViewMemberList.css";

const UserViewMemberList = () => {
  const [isUserInfoPopup, setUserInfoPopup] = useState(false);

  return (
    <div className="user-view-member-list">
      <div className="user-profile-container-parent">
        <div className="user-profile-container" id="user_profile_container">
          <img
            className="user-image-memebers-view"
            alt=""
            src="/user-image-memebers-view@2x.png"
          />
          <div className="user-name-member">Alexa Cristina Georgescu</div>
          <b className="phone-number-member">+40 666 234 53</b>
        </div>
        <DropdownButton
          className="profile-info"
          title=""
          size="sm"
          variant="primary"
          align="start"
          drop="down"
        >
          <Dropdown.Item onClick={() => setUserInfoPopup(true)}>
            <img src={userIcon}></img>
            View Profile
          </Dropdown.Item>
          <ViewUserInfo showPopup={isUserInfoPopup} onClose={() => setUserInfoPopup(false)} />
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
