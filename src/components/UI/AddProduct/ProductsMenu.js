import { React, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

import "./ProductsMenu.css";

import AddProduct from './AddProduct';
import ProductView from './ProductView';

const ProductsMenu = ({ showPopup, onClose }) => {
  const [orderList] = useState([[2, "Burger Vita", 25.6, "https://acconstorage.blob.core.windows.net/acconpictures/202105111217_WRJ1_.jpeg", "Appertizer", "2 Chifle, cascaval topit, sorie, sos de ustroi, ceapa"], [2, "Burger", 27.5, "https://acconstorage.blob.core.windows.net/acconpictures/202105111215_OMFY_.jpeg"], [1, "Salata", 25.0, "https://www.rainbowls.ro/assets/images/gallery/salata1.jpg"], [1, "Salata", 50.4]]);
  const [selected, setSelected] = useState("none");
  const [isAddProductPopup, setAddProductPopUp] = useState(false);
  const [error, setError] = useState("");
  const [isProductView, setProductView] = useState(false);
  const [productData, setProductData] = useState([]);

  const handleOnSelect = (index) => {
    setSelected(index);
    setProductData(orderList[index]);
  }

  const handleOnAddProduct = () => {
    setAddProductPopUp(!isAddProductPopup);
  }

  const handleOnViewProduct = () => {
    if (selected === "none") {
      setError("Select a product to view");
    } else {
      setError("");
      setProductView(!isProductView);
    }
  }

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered>
      <div className="productsmenu">
        <div className="close-btn" id="top-bar-container" onClick={onClose}>
          <p className="products-menu" id="font-size-16">
            Product’s Menu
          </p>
          <button className="x1" id="close-btn" onClick={onClose}>
            <img className="vector-icon-ProductMenu" alt="" src="/vector3.svg" />
            <img className="vector-icon-ProductMenu" alt="" src="/vector4.svg" />
          </button>
        </div>
        <input className="cleaning-msg" type="text" placeholder="Search" />
        {
          orderList.map((item, index) => (
            <button className={`product-product-menu
            ${selected === index ? "selected-button" : ""}
            `}
              onClick={() => handleOnSelect(index)}>
              <div className="product-name-productmenu">{item[1]}</div>
              <div className="product-name-productmenu">{item[2]} Lei</div>
            </button>
          ))
        }
        <div className="event-row error">
          {error}
        </div>
        <div className="btns-productmenu">
          <div className="main-btns-productmenu">
            <button className="add-productmenu" onClick={handleOnAddProduct}>
              <div className="add1">Add</div>
            </button>
            <AddProduct showPopup={isAddProductPopup} onClose={handleOnAddProduct} />
          </div>
          <button className="viewproduct-productmenu" onClick={() => handleOnViewProduct()}>
            <b className="view-product">View Product</b>
          </button>
          <ProductView productData={productData} showPopup={isProductView} onClose={handleOnViewProduct}/>
        </div>
      </div>
    </Modal>
  );
};

export default ProductsMenu;
