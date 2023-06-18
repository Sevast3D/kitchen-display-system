  import { useState } from 'react';

  import Dropdown from 'react-bootstrap/Dropdown';
  import DropdownButton from 'react-bootstrap/DropdownButton';

  import './Profile.css'

  import MyProfile from "./MyProfile.js"
  import profilePic from "./assets/ProfileImage.jpg"
  import logout from "./assets/log-out.png"
  import user from "./assets/user.png"

  const Profile = ({profileData}) => {
    const [isMyProfile, setMyProfile] = useState(false);

    // console.log(profileData);

    return (
      <div className='profile-view' id="profile_preview">
        <div className='circular-container'>
          <img className='profile-image' src={profilePic} alt=''></img>
        </div>
        <DropdownButton id="dropdown-basic-button" title={`${profileData.firstName} ${profileData.lastName}`} variant="outline-secondary">
          <Dropdown.Item onClick={() => setMyProfile(true)}><img src={user}></img>Account Settings</Dropdown.Item>
          <MyProfile showPopup={isMyProfile} onClose={() => setMyProfile(false)} />
          <Dropdown.Item href="/"><img src={logout}></img>Log out</Dropdown.Item>
        </DropdownButton >
      </div >
    )
  }

  export default Profile;
