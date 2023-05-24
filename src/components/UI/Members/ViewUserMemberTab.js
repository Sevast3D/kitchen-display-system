import Modal from 'react-bootstrap/Modal';

import "./ViewUserMemberTab.css";

const ViewUserMemberTab = ({ user, showPopup, onClose }) => {
  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered >
      <div className="view-user-member-tab">
        <div className="main-container1" id="products_container">
          <div className="left-side-contrainer1">
            <img
              className="user-image-view-user1"
              alt=""
              src={user[4]}
            />
            <div className="roles">
              <div className="roles-container">
                {user[user.length - 1] === 0 ? "" : ""}

                {user[user.length - 1] >= 1 ?
                  <div className="waiter">
                    <div className="chief">Waiter</div>
                  </div> : ""}

                {user[user.length - 1] >= 2 ? <div className="cheif">
                  <div className="chief">{`Chief `}</div>
                </div>
                  : ""}

                {user[user.length - 1] === 3 ?
                  <div className="admin">
                    <div className="chief">{`Admin `}</div>
                  </div> : ""}
              </div>
            </div>
          </div>
          <div className="user-info1">
            <div className="username-container1">
              <div className="roles-text1">User Name</div>
              <div className="usernameid1">{user[0]} {user[1]}</div>
            </div>
            <div className="phone-container1">
              <div className="roles-text1">Phone Number</div>
              <div className="phone1">{user[3]}</div>
            </div>
            <div className="phone-container1">
              <div className="roles-text1">Email</div>
              <div className="phone1">{user[2]}</div>
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
