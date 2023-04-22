import { useState, useCallback } from "react";
import ProductView from "./ProductView";
import PortalPopup from "./PortalPopup";
import OrderDetails from "./OrderDetails";
import "./AddOrder.css";
const AddOrder = ({ onClose }) => {
  const [isProductViewPopupOpen, setProductViewPopupOpen] = useState(false);
  const [isOrderDetailsPopupOpen, setOrderDetailsPopupOpen] = useState(false);

  const openProductViewPopup = useCallback(() => {
    setProductViewPopupOpen(true);
  }, []);

  const closeProductViewPopup = useCallback(() => {
    setProductViewPopupOpen(false);
  }, []);

  const openOrderDetailsPopup = useCallback(() => {
    setOrderDetailsPopupOpen(true);
  }, []);

  const closeOrderDetailsPopup = useCallback(() => {
    setOrderDetailsPopupOpen(false);
  }, []);

  return (
    <>
      <div className="add-order">
        <div className="close-btn" id="top-bar-container" onClick={onClose}>
          <button className="x2" id="close-btn" onClick={onClose}>
            <img className="vector-icon6" alt="" src="/vector3.svg" />
            <img className="vector-icon6" alt="" src="/vector4.svg" />
          </button>
        </div>
        <div className="buttons1" id="nav">
          <button className="appetizers-btn">
            <b className="appetizers2">Appetizers</b>
          </button>
          <button className="entrees">
            <div className="entrees1">Entrees</div>
          </button>
          <button className="entrees">
            <div className="entrees1">Sides</div>
          </button>
          <button className="entrees">
            <div className="entrees1">Desserts</div>
          </button>
          <button className="entrees">
            <div className="entrees1">Beverages</div>
          </button>
        </div>
        <div
          className="products1"
          id="products_container"
          onClick={openProductViewPopup}
        >
          <div className="product-view1" id="product">
            <img
              className="product-image-icon1"
              alt=""
              src="/product-image1@2x.png"
            />
            <div className="text-cantainer" id="text-container">
              <p className="burger-vita1" id="product_name">
                Burger Vita
              </p>
            </div>
          </div>
        </div>
        <div className="bottom-bar" id="bottom-bar">
          <div className="info">
            <div className="pieces" id="pieces_container">
              <div className="pieces-ordered">Pieces Ordered:</div>
              <p className="burger-vita1" id="pieces_number">
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
              onClick={openOrderDetailsPopup}
            >
              <div className="vector-wrapper">
                <img className="vector-icon8" alt="" src="/vector5.svg" />
              </div>
            </button>
            <button className="add-to-list-btn" id="add_btn" onClick={onClose}>
              <div className="vector-wrapper">
                <img className="vector-icon9" alt="" src="/eat.svg" />
              </div>
              <div className="add-to-list">Add to List</div>
            </button>
          </div>
        </div>
      </div>
      {isProductViewPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeProductViewPopup}
        >
          <ProductView onClose={closeProductViewPopup} />
        </PortalPopup>
      )}
      {isOrderDetailsPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOrderDetailsPopup}
        >
          <OrderDetails onClose={closeOrderDetailsPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default AddOrder;
