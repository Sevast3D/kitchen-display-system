import "./MyProfile.css";
const MyProfile = ({ onClose }) => {
  return (
    <div className="my-profile">
      <div className="close-btn" id="top-bar-container" onClick={onClose}>
        <button className="x" id="close-btn" onClick={onClose}>
          <img className="vector-icon" alt="" src="/vector3.svg" />
          <img className="vector-icon" alt="" src="/vector4.svg" />
        </button>
      </div>
      <div className="main-container2" id="products_container">
        <div className="left-side-contrainer2">
          <img
            className="user-image-view-user2"
            alt=""
            src="/user-image-view-user@2x.png"
          />
          <div className="roles1">
            <div className="first-name-text">Roles</div>
            <div className="roles-container1">
              <div className="admin2">
                <div className="admin3">{`Admin `}</div>
              </div>
              <div className="cheif1">
                <div className="admin3">{`Chief `}</div>
              </div>
              <div className="waiter2">
                <div className="admin3">Waiter</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side-container">
          <div className="names-container">
            <div className="first-name">
              <div className="first-name-text">First Name</div>
              <input className="first-name-input" type="text" />
            </div>
            <div className="first-name">
              <div className="first-name-text">Last Name</div>
              <input className="last-name-input" type="text" />
            </div>
          </div>
          <div className="password-text-parent">
            <div className="first-name-text">Phone Number</div>
            <input
              className="phone-input"
              type="number"
              placeholder="+ 40 232 243 27"
            />
          </div>
          <div className="password-text-parent">
            <div className="first-name-text">Email</div>
            <input
              className="phone-input"
              type="text"
              placeholder="youremail@gmail.com"
            />
          </div>
          <div className="password-text-parent">
            <div className="first-name-text">Password</div>
            <input className="password-input" type="password" />
          </div>
          <button className="add-to-list-btn" id="add_btn">
            <div className="edit-profile">Edit Profile</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
