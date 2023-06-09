import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./ViewUserMemberTabAdmin.css";
const ViewUserMemberTabAdmin = ({ onClose }) => {
  return (
    <div className="view-user-member-tab-admin">
      <div className="main-container" id="products_container">
        <div className="left-side-contrainer">
          <img
            className="user-image-view-user"
            alt=""
            src="/user-image-view-user@2x.png"
          />
        </div>
        <div className="user-info">
          <div className="username-container">
            <div className="username-text">User Name</div>
            <div className="usernameid">Cristina-Marina Popescu</div>
          </div>
          <div className="phone-container">
            <div className="username-text">Phone Number</div>
            <div className="phone">+ 40 232 243 27</div>
          </div>
          <div className="phone-container">
            <div className="username-text">Email</div>
            <div className="phone">youremail@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="phone-container">
        <div className="username-text">Roles</div>
        <div className="select-roles-container">
          <Form.Check label="Radio" type="radio" inline />
          <Form.Check label="Radio" type="radio" inline />
          <Form.Check label="Radio" type="radio" inline />
        </div>
      </div>
      <button className="close-btn-user-view" onClick={onClose}>
        <div className="close">Close</div>
      </button>
    </div>
  );
};

export default ViewUserMemberTabAdmin;
