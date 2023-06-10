import { React, useState, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProduct.css";

const AddProduct = ({ showPopup, onClose }) => {
  const nameRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const handleOnAdd = () => {
    const name = nameRef.current.value;
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;
    const image = imageRef.current.value;
    console.log(name, amount, description, category, image);
    window.location.reload();
  }

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
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
            ref={nameRef}
          />
        </div>
        <div className="namecontainer-addproduct">
          <div className="nametest-addproduct">Price</div>
          <input
            className="nameinput-addproduct"
            type="number"
            placeholder="Amount"
            ref={amountRef}
          />
        </div>
        <div className="namecontainer-addproduct">
          <div className="nametest-addproduct">Components</div>
          <textarea
            className="descriptiontextare-addproduct"
            placeholder="Description"
            ref={descriptionRef}
          />
        </div>
        <div className="namecontainer-addproduct">
          <div className="nametest-addproduct">Category</div>
          <Form.Select className="selectdefault-formselect" ref={categoryRef}>
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
          <input
            className="nameinput-addproduct"
            type="text"
            placeholder="Image URL"
            ref={imageRef}
          />
        </div>
        <div className="btns-addproduct">
          <button className="addbtn-addproduct" onClick={handleOnAdd}>
            <div className="pay-addproduct">
              <b className="add-addproduct">Add</b>
            </div>
          </button>
          <button className="cancel-addproduct" onClick={onClose}>
            <div className="cancel">Cancel</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
