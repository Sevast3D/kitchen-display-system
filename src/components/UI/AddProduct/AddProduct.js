import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./AddProduct.css";
const AddProduct = ({ onClose }) => {
  return (
    <div className="addproduct">
      <div
        className="close-btn-addproduct"
        id="top-bar-container"
        onClick={onClose}
      >
        <p className="add-product" id="font-size-16">
          Add Product
        </p>
        <button className="x" id="close-btn" onClick={onClose}>
          <img className="vector-icon1" alt="" src="/vector3.svg" />
          <img className="vector-icon1" alt="" src="/vector4.svg" />
        </button>
      </div>
      <div className="namecontainer-addproduct">
        <div className="nametest-addproduct">Product Name</div>
        <input
          className="nameinput-addproduct"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="namecontainer-addproduct">
        <div className="nametest-addproduct">Price</div>
        <input
          className="nameinput-addproduct"
          type="number"
          placeholder="Amount"
        />
      </div>
      <div className="namecontainer-addproduct">
        <div className="nametest-addproduct">Components</div>
        <textarea
          className="descriptiontextare-addproduct"
          placeholder="Description"
        />
      </div>
      <div className="namecontainer-addproduct">
        <div className="nametest-addproduct">Category</div>
        <Form.Select className="selectdefault-formselect">
          <option>Select category</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Entrees">Entrees</option>
          <option value="Sides">Sides</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
        </Form.Select>
      </div>
      <div className="namecontainer-addproduct">
        <div className="nametest-addproduct">Image</div>
        <input className="phone-input" type="file" />
      </div>
      <div className="btns-addproduct">
        <button className="addbtn-addproduct">
          <button className="pay">
            <b className="add">Add</b>
          </button>
        </button>
        <button className="cancel-addproduct">
          <div className="cancel">Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
