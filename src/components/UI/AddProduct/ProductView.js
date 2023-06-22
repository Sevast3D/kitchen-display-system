import { React, useState } from 'react'
import { Modal } from 'react-bootstrap';

import "./ProductView.css";
import trash from './assets/removeBtn.png';

const ProductView = ({ productData, showPopup, onClose }) => {

  const handleOnProductRemove = () => {

    async function deleteProducts(productId) {
      // 
      try {
        const deleteProductRequest = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        const response = await fetch(`http://localhost:8080/products/${parseInt(productId, 10)}`, deleteProductRequest)
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    deleteProducts(productData.id);
    window.location.reload();
  }
  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="product-view-setting">
        <img
          className="product-image-productview-icon"
          alt=""
          id="product_image"
          src={productData.image}
        />
        <div className="product-main-productview" id="product_data_container">
          <p className="productname-productview" id="product_name">
            {productData.name}
          </p>
          <p className="price-productview" id="price">
            {productData.price + " Lei"}
          </p>
        </div>
        <div className="categorycontainer-productview">
          <div className="categroytext-productview">Category</div>
          <div className="categroy-productview">
            <span>{productData.category}</span>
            <span className="span">{` `}</span>
          </div>
        </div>
        <div className="description-productview">
          <div className="categroytext-productview">{`Description `}</div>
          <div className="description-productview1">{productData.components}</div>
        </div>
        <div className="btnscontainer-productview" id="btn_contrainer">
          <button className="closebtn-productview" id="add_btn" onClick={onClose}>
            <b className="close-productview">Close</b>
          </button>
          <button
            className="removebtn-productview"
            id="delete_btn"
            onClick={handleOnProductRemove}
          >
            <img className="vector-icon-productview" alt="" src={trash} />
          </button>

        </div>
      </div>
    </Modal>
  );
};

export default ProductView;
