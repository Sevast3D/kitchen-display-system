import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './Profile.css'
import { auth, getUserData } from '../../../firebase';

import MyProfile from "./MyProfile.js"
import profilePic from "./assets/ProfileImage.jpg"
import logout from "./assets/log-out.png"
import user from "./assets/user.png"

const Profile = () => {
  const [isMyProfile, setMyProfile] = useState(false);
  const history = useHistory(); 
  const [profileData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
  }, []);

  // console.log(profileData);

  const handleLogOut = () => {
    auth.signOut()
    .then(()=>{
      history.push('/');
      sessionStorage.removeItem("userUID");
    })
  }
  
  if(isLoading){
    return
  }

  return (
    <div className='profile-view' id="profile_preview">
      <div className='circular-container'>
        <img className='profile-image' src={profileData.profileImage} alt=''></img>
      </div>
      <DropdownButton id="dropdown-basic-button" title={`${profileData.firstName} ${profileData.lastName}`} variant="outline-secondary">
        <Dropdown.Item onClick={() => setMyProfile(true)}><img src={user}></img>Account Settings</Dropdown.Item>
        <MyProfile showPopup={isMyProfile} onClose={() => setMyProfile(false)} />
        <Dropdown.Item onClick={handleLogOut}><img src={logout}></img>Log out</Dropdown.Item>
      </DropdownButton >
    </div >
  )
}

export default Profile;
