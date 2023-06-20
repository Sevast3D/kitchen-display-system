import "./MyProfile.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef } from 'react';
import { changeEmail, changePassword, getUserData, writeUserData, auth, storage, uploadImage } from "../../../firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import noProfilePic from './assets/user-no-image.png'

const MyProfile = ({ showPopup, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setUserData] = useState([]);
  // Profile image 
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("")
  const [editData, setEditData] = useState(true);

  const passwordRef = useRef();
  const passwordRepetRef = useRef();
  const newPasswordRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    getUserData()
      .then((userData) => {
        // Access and use the userData here
        // console.log(userData);
        setUserData(userData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);

        setIsLoading(false);
      })
    setImage(profileData.profileImage)
    // const storage = getStorage();
    // const imageRef = storageRef(storage, `users/${profileData.userUID}/profileImage`);
    // getDownloadURL(imageRef)
    //   .then((url) => {
    //     setImageUrl(url);
    //   })
    //   .catch((error) => {
    //     console.log("Failed to retrieve image:", error);
    //   });
  }, []);

  const handleUpdateUser = () => {
    const firstNameInput = firstNameRef.current.value;
    const lastNameInput = lastNameRef.current.value;
    const phoneNumberInput = phoneNumberRef.current.value;
    const emailInput = emailRef.current.value;
    const newPasswordInput = newPasswordRef.current.value;

    setEditData(true);
    setError("")

    let firstName = profileData.firstName;
    let lastName = profileData.lastName;
    let email = profileData.email;
    let phoneNumber = profileData.phoneNumber;
    let profileImage = profileData.profileImage;
    let password = newPasswordInput;

    if (firstNameInput != "") {
      firstName = firstNameInput;
    }
    if (lastNameInput != "") {
      lastName = lastNameInput;
    }
    if (emailInput != "") {
      email = emailInput;
    }
    if (phoneNumberInput != "") {
      if (phoneNumberInput.length > 8) {
        phoneNumber = phoneNumberInput;
        setEditData(true)
      } else {
        setError("Phone Number Should to have at least 9 character!")
        setEditData(false)
      }
    }
    // const imageURL = await getDownloadURL(imageRef);
    const user = sessionStorage.getItem('userUID');

    // Upload Image to Storage
    async function uploadImageToStorage() {
      if (image) {
        // console.log("old  Image:" + profileImage)
        try {
          const imageURL = await uploadImage(user, image);
          setImageURL(imageURL);
          profileImage = imageURL;
          // console.log("new  Image:" + profileImage)
          setImage(null);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('No Image')
        setImageURL(profileImage)
      }
    }

    // Call the uploadIUserData function and wait for it to complete
    async function updateUserData() {
      // 
      await uploadImageToStorage();
      // console.log("Continue")

      const updateUser = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          profileImage: profileImage,
          role: profileData.role
        }),
      }

      // Update user Email in firebase
      async function handleEmailChange(newEmail) {
        try {
          changeEmail(newEmail);
        } catch (error) {
          setError("Test:" + error);
          setEditData(false)
        }
      }
      if (emailInput.length !== 0) {
        handleEmailChange(email);
      }

      if (editData) {
        fetch(`http://localhost:8080/users/${profileData.userId}`, updateUser)
          .then(res => {
            if (res.ok) {
              const user = sessionStorage.getItem('userUID');
              // Update logged user values
              // console.log("ProfileImage END: " + profileImage)
              // console.log("Image END: " + imageURL)
              writeUserData(user, profileData.userId, firstName, lastName, email, phoneNumber, profileImage, profileData.role);
              changePassword(password);
              handleSave();
              return null;
            } else {
              setError('Update user Data Failed on Backend!');
            }
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      }else{
        console.log("Editdat off")
      }
    }
      updateUserData();
  }

  const handleCheckValues = () => {
    const newPassword = newPasswordRef.current.value;
    const passwordRepet = passwordRepetRef.current.value;

    if ((newPassword === passwordRepet) && (newPassword != "")) {
      handleUpdateUser();
    } else {
      setError("Paswords are not the same, retype.")
    }

  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      console.log(file)
    } else {
      // Handle case when no file is selected
      console.log("No file selected.");
    }
  }

  const handleSave = () => {
    // Add save logic here
    window.location.reload();
  };

  const handleClose = () => {
    if (isEditing) {
      // window.location.reload();
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
