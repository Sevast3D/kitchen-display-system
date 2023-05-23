import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton, SplitButton } from "react-bootstrap";
import "./UserViewMemberList.css";
const UserViewMemberList = () => {
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
          title=" "
          size="sm"
          variant="primary"
          align="start"
          drop="down"
        >
          <Dropdown.Item>View Profile</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default UserViewMemberList;
