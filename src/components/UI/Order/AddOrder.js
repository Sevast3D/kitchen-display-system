import { useState, useCallback } from "react";

import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import ProductView from "./ProductView";
import OrderDetails from "./OrderDetails";
import "./AddOrder.css";


import Eat from "./Assets/eat1.svg";

const MenuAppetizers = [{id: 2, nameProdus: "Burger Vita si Pui", img:"./product-image@2x.png", price: 26.59, components: "Cola 0.5, Carne Vita Mediu, Cartofi", category: 0},
{id: 4, nameProdus: "Shaorma Mare", img: "./shaorma.png", price: 11.59, componets: "Pui, Lipie, Restu'", category: 0}]

// const MenuEntrees = [[5, "Salata cu de Toate", "./Salata1.jpg", 34.59, "Branza, salata, rosii, masline verzi, arder gras, avocado.", 1]];
const MenuEntrees = [];

const AddOrder = ({showPopup, onClose }) => {
  const [isProductViewPopupOpen, setProductViewPopupOpen] = useState(false);
  const [isOrderDetailsPopupOpen, setOrderDetailsPopupOpen] = useState(false);

  const [activeKey, setActiveKey] = useState('link-0');
  const [itemDetails, setItemDetails] = useState({});
  const handleSelect = (eventKey) => setActiveKey(eventKey);

  const handleOpenProduct = (item) => {
    setItemDetails(item);
    setProductViewPopupOpen(!isProductViewPopupOpen);
  }

  const handleOpenOrderList = () => {
    setOrderDetailsPopupOpen(!isOrderDetailsPopupOpen)
  }

  return (
    <>
      <Modal show={showPopup} onHide={onClose} animation={false} centered>
        <div className="add-order">
          <div className="close-btn" id="top-bar-container">
            <button className="x2" id="close-btn" onClick={onClose}>
              <img className="vector-icon6" alt="" src="/vector3.svg" />
              <img className="vector-icon6" alt="" src="/vector4.svg" />
            </button>
          </div>
          <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link eventKey="link-0"><b className="">Appetizers</b></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1"><b className="">Entrees</b></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2"><b className="">Sides</b></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3"><b className="">Desserts</b></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-4"><b className="">Beverages</b></Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="products1" id="products_container">
            {activeKey === 'link-0' &&
              MenuAppetizers.map(item => (
                <div className="product-view1 gray-overlay"
                  id="product"
                  onClick={() => handleOpenProduct(item)}
                  key={item.id}>
                  <img className="product-image-icon1" alt="" src={item.img} />
                  <div className="text-cantainer" id="text-container">
                    <p className="product_name" id="product_name">
                      {item.nameProdus}
                    </p>
                  </div>
                </div>
              ))}
            <ProductView itemDetails={itemDetails} openProductViewPopup={isProductViewPopupOpen} onClose={handleOpenProduct} />
            {activeKey === 'link-1' &&
              MenuEntrees.map((item, key) => (
                <div className="product-view1 gray-overlay"
                  id="product"
                  onClick={() => handleOpenProduct(item)}
                  key={item.id}>
                  <img className="product-image-icon1" alt="" src={item[2]} />
                  <div className="text-cantainer" id="text-container">
                    <p className="product_name" id="product_name">
                      {item[1]}
                    </p>
                  </div>
                </div>
              ))}
            <ProductView itemDetails={itemDetails} openProductViewPopup={isProductViewPopupOpen} onClose={handleOpenProduct} />
          </div>
          <div>
            {/* {list.map((item) => (
              <p className="font-size-16 text-black">- {item[1]}</p>
            ))} */}
          </div>
          <div className="bottom-bar" id="bottom-bar">
            <div className="info">
              <div className="pieces" id="pieces_container">
                <div className="pieces-ordered">Products Ordered:</div>
                <p className="product_name" id="pieces_number">
                  7
                </p>
              </div>
              <div className="order" id="order_container">
                <p className="order-id">Order ID:</p>
                <p className="order-id" id="order_id">
                  1323
                </p>
              </div>
            </div>
            <div className="buttons2" id="buttons_container">
              <button
                className="shopping-bag"
                id="order_list_btn"
                onClick={handleOpenOrderList}
              >
                <OrderDetails openOrderList={isOrderDetailsPopupOpen} onClose={handleOpenOrderList} />
                <div className="vector-wrapper">
                  <img className="vector-icon8" alt="" src="/vector5.svg" />
                </div>
              </button>
              <button className="add-to-list-btn" id="add_btn" onClick={onClose}>
                <div className="vector-wrapper">
                  <img className="vector-icon9" alt="" src={Eat} />
                </div>
                <div className="add-to-list">Add to List</div>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddOrder;
