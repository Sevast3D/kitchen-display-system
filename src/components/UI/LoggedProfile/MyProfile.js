import "./MyProfile.css";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


const MyProfile = ({ showPopup, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log('Save clicked');
    // Add your save logic here
  };

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered >
      <div className="my-profile">
        <div className="close-btn" id="top-bar-container" onClick={onClose}>
          <button className="x" id="close-btn" onClick={onClose}>
            <img className="vector-icon-profile" alt="" src="/vector3.svg" />
            <img className="vector-icon-profile" alt="" src="/vector4.svg" />
          </button>
        </div>
        <div className="main-container2" id="products_container">
          <div className="left-side-contrainer2">
            <img
              className="user-image-view-user2"
              alt=""
              src="/user-image-view-user@2x.png"
            />
            <div className="roles">
              <div className="first-name-text">Roles</div>
              <div className="roles-container">
                <div className="admin">
                  <div className="chief">Admin</div>
                </div>
                <div className="cheif">
                  <div className="chief">Chief</div>
                </div>
                <div className="waiter">
                  <div className="chief">Waiter</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-side-container">
            <div className="names-container">
              <div className="first-name">
                <div className="first-name-text">First Name</div>
                <input
                  className="first-name-input"
                  type="text"
                  disabled={!isEditing}
                />
              </div>
              <div className="first-name">
                <div className="first-name-text">Last Name</div>
                <input
                  className="last-name-input"
                  type="text"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="password-text-parent">
              <div className="first-name-text">Phone Number</div>
              <input
                className="phone-input"
                type="number"
                placeholder="+ 40 232 243 27"
                disabled={!isEditing}
              />
            </div>
            <div className="password-text-parent">
              <div className="first-name-text">Email</div>
              <input
                className="phone-input"
                type="text"
                placeholder="youremail@gmail.com"
                disabled={!isEditing}
              />
            </div>
            <div className="password-text-parent">
              <div className="first-name-text">Password</div>
              <input
                className="password-input"
                type="password"
                disabled={!isEditing}
              />
            </div>
            <button
              className="add-to-list-btn"
              id="add_btn"
              onClick={() => {
                if (isEditing) {
                  handleSave();
                }
                setIsEditing(!isEditing);
              }}
            >
              <div className="edit-profile">{isEditing ? 'Save' : 'Edit Profile'}</div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MyProfile;
