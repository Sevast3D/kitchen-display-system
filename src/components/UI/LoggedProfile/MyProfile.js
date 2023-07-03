import "./MyProfile.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef } from 'react';
import { changeEmail, changePassword, getUserData, writeUserData, auth, storage, uploadImage } from "../../../firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import noProfilePic from './assets/user-no-image.png'

const MyProfile = ({ showPopup, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Add save logic here
    window.location.reload();
  };

  const handleClose = () => {
    if (isEditing) {
      window.location.reload();
    } else {
      onClose();
    }
  };


  return (
    <Modal show={showPopup} onHide={handleClose} animation={false} centered >
      <div className="my-profile">
        <div className="close-btn" id="top-bar-container">
          <button className="x" id="close-btn" onClick={handleClose}>
            <img className="vector-icon-profile" alt="" src="/vector3.svg" />
            <img className="vector-icon-profile" alt="" src="/vector4.svg" />
          </button>
        </div>
        <div className="main-container2" id="products_container">
          <div className="left-side-contrainer2">
            <img
              className="user-image-view-user2"
              alt=""
              src={profileData.profileImage}
            />
            <div className="roles">
              <div className="first-name-text">Roles</div>
              <div className="roles-container">
                {profileData.role === "ADMIN" ? <>
                  <div className="admin">
                    <div className="chief">Admin</div>
                  </div>
                  <div className="cheif">
                    <div className="chief">Chief</div>
                  </div>
                  <div className="waiter">
                    <div className="chief">Waiter</div>
                  </div>
                </> : ""}
                {profileData.role === "CHIEF" ? <>
                  <div className="cheif">
                    <div className="chief">Chief</div>
                  </div>
                  <div className="waiter">
                    <div className="chief">Waiter</div>
                  </div>
                </> : ""}
                {profileData.role === "WAITER" ? <>
                  <div className="waiter">
                    <div className="chief">Waiter</div>
                  </div>
                </> : ""}
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
                  placeholder={profileData.firstName}
                  disabled={!isEditing}
                  ref={firstNameRef}
                />
              </div>
              <div className="first-name">
                <div className="first-name-text">Last Name</div>
                <input
                  className="last-name-input"
                  type="text"
                  placeholder={profileData.lastName}
                  disabled={!isEditing}
                  ref={lastNameRef}
                />
              </div>
            </div>
            <div className="password-text-parent">
              <div className="first-name-text">Phone Number</div>
              <input
                className="phone-input"
                type="number"
                placeholder={`+${profileData.phoneNumber}`}
                disabled={!isEditing}
                ref={phoneNumberRef}
              />
            </div>
            <div className="password-text-parent">
              <div className="first-name-text">Email</div>
              <input
                className="phone-input"
                type="text"
                placeholder={profileData.email}
                disabled={!isEditing}
                ref={emailRef}
              />
            </div>
            <div className="password-text-parent">
              {isEditing ?
                <><div className="first-name-text">New Password (or) Old Password</div><input
                  className="password-input"
                  type="password"
                  placeholder="********"
                  ref={newPasswordRef}
                  disabled={!isEditing} /></> : <div></div>}

              {isEditing ?
                <><div className="first-name-text">Repet Password</div><input
                  className="password-input"
                  type="password"
                  placeholder="********"
                  ref={passwordRepetRef}
                  disabled={!isEditing}
                />
                  <div className="first-name-text">Upload Profile Image</div>
                  <input type='file' onChange={handleImageChange}></input>
                </> : <div></div>}

            </div>
            <div>
            </div>
            {isEditing === true ? <><div className="flex-start text-red" style={{ width: "100%" }}>
              Password is mandatory to change values.
            </div></> : ""}
            {error != "" ? <><div className="alert alert-danger">
              <strong>Error!</strong> {error}
            </div></> : ""}
            <button
              className="add-to-list-btn"
              id="add_btn"
              onClick={() => {
                if (isEditing) {
                  handleCheckValues();
                } else {
                  setIsEditing(!isEditing);
                }
              }}
            >
              <div className="edit-profile">{isEditing ? 'Save' : 'Edit Profile'}</div>
            </button>
          </div>
        </div>
      </div>
    </Modal >
  );
};

export default MyProfile;
