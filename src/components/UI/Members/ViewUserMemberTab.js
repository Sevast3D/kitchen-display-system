import Modal from 'react-bootstrap/Modal';

import "./ViewUserMemberTab.css";
import noImage from './../LoggedProfile/assets/user-no-image.png'

const ViewUserMemberTab = ({ user, showPopup, onClose }) => {
  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered >
      <div className="view-user-member-tab">
        <div className="main-container1" id="products_container">
          <div className="left-side-contrainer1">
            {/* <img
              className="user-image-view-user1"
              alt=""
              src={user.profileImage}
            /> */}
            {user.profileImage === null || user.profileImage === undefined ?
              <img className="user-image-view-user" alt="" src={noImage} /> :
              <img className="user-image-view-user" alt="" src={user.profileImage} />
            }
            <div className="roles">
              <div className="roles-container">
                {user.role === "WAITER" ?
                  <div className="waiter">
                    <div className="chief">Waiter</div>
                  </div> : ""}

                {user.role === "CHEF" ?
                  <>
                    <div className="waiter">
                      <div className="chief">Waiter</div>
                    </div>
                    <div className="cheif">
                      <div className="chief">Chef </div>
                    </div>
                  </>
                  : ""}

                {user.role === "ADMIN" ?
                  <>
                    <div className="waiter">
                      <div className="chief">Waiter</div>
                    </div>
                    <div className="cheif">
                      <div className="chief">Chef </div>
                    </div>
                    <div className="admin">
                      <div className="chief">Admin</div>
                    </div>
                  </>
                  : ""}
              </div>
            </div>
          </div>
          <div className="user-info1">
            <div className="username-container1">
              <div className="roles-text1">User Name</div>
              <div className="usernameid1">{user.firstName} {user.lastName}</div>
            </div>
            <div className="phone-container1">
              <div className="roles-text1">Phone Number</div>
              <div className="phone1">{`+ ${user.phoneNumber}`}</div>
            </div>
            <div className="phone-container1">
              <div className="roles-text1">Email</div>
              <div className="phone1">{user.email}</div>
            </div>
          </div>
        </div>
        <button className="close-btn-user-view1" onClick={onClose}>
          <div className="close1">Close</div>
        </button>
      </div>
    </Modal>
  );
};

export default ViewUserMemberTab;
