import { React, useState } from 'react'
import { Modal } from 'react-bootstrap';

import "./ProductView.css";
import trash from './assets/removeBtn.png';

const ProductView = ({productData, showPopup, onClose }) => {

  const handleOnProductRemove = () =>{
    console.log("Remove" + productData);
    window.location.reload();
  }
  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="product-view-setting">
        <img
          className="product-image-productview-icon"
          alt=""
          id="product_image"
          src={productData[3]}
        />
        <div className="product-main-productview" id="product_data_container">
          <p className="productname-productview" id="product_name">
            {productData[1]}
          </p>
          <p className="price-productview" id="price">
            {productData[2] + " Lei"}
          </p>
        </div>
        <div className="categorycontainer-productview">
          <div className="categroytext-productview">Category</div>
          <div className="categroy-productview">
            <span>{productData[4]}</span>
            <span className="span">{` `}</span>
          </div>
        </div>
        <div className="description-productview">
          <div className="categroytext-productview">{`Description `}</div>
          <div className="description-productview1">{productData[5]}</div>
        </div>
        <div className="btnscontainer-productview" id="btn_contrainer">
          <button
            className="removebtn-productview"
            id="delete_btn"
            onClick={handleOnProductRemove}
          >
            <img className="vector-icon-productview" alt="" src={trash} />
          </button>
          <button className="closebtn-productview" id="add_btn" onClick={onClose}>
            <b className="close-productview">Close</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductView;
