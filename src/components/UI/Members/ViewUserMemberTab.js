import "./ViewUserMemberTab.css";
const ViewUserMemberTab = ({ onClose }) => {
  return (
    <div className="view-user-member-tab">
      <div className="main-container1" id="products_container">
        <div className="left-side-contrainer1">
          <img
            className="user-image-view-user1"
            alt=""
            src="/user-image-view-user@2x.png"
          />
          <div className="roles">
            <div className="roles-text1">Roles</div>
            <div className="roles-container">
              <div className="admin">
                <div className="chief">{`Admin `}</div>
              </div>
              <div className="cheif">
                <div className="chief">{`Chief `}</div>
              </div>
              <div className="waiter">
                <div className="chief">Waiter</div>
              </div>
            </div>
          </div>
        </div>
        <div className="user-info1">
          <div className="username-container1">
            <div className="roles-text1">User Name</div>
            <div className="usernameid1">Cristina-Marina Popescu</div>
          </div>
          <div className="phone-container1">
            <div className="roles-text1">Phone Number</div>
            <div className="phone1">+ 40 232 243 27</div>
          </div>
          <div className="phone-container1">
            <div className="roles-text1">Email</div>
            <div className="phone1">youremail@gmail.com</div>
          </div>
        </div>
      </div>
      <button className="close-btn-user-view1" onClick={onClose}>
        <div className="close1">Close</div>
      </button>
    </div>
  );
};

export default ViewUserMemberTab;
