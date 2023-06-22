import { useState, useCallback, useEffect } from "react";

import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import ProductView from "./ProductView";
import OrderDetails from "./OrderDetails";
import "./AddOrder.css";


import Eat from "./Assets/eat1.svg";

const AddOrder = ({ deskId, showPopup, onClose }) => {
  const [isProductViewPopupOpen, setProductViewPopupOpen] = useState(false);
  const [isOrderDetailsPopupOpen, setOrderDetailsPopupOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);

  const [activeKey, setActiveKey] = useState('link-0');
  const [itemDetails, setItemDetails] = useState([]);
  const [menuAppetizers, setMenuAppetizers] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [sides, setSides] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const getAllProducts = {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
      const response = await fetch('http://localhost:8080/products', getAllProducts)
      const data = await response.json();

      function formattedData(product) {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          components: product.components,
          category: product.category
        }
      }
      const appetizers = data.filter((product) => product.category === "APPETIZERS").map(formattedData)
      setMenuAppetizers(appetizers);
      const entrees = data.filter((product) => product.category === "ENTREES").map(formattedData)
      setEntrees(entrees);
      const sides = data.filter((product) => product.category === "SIDES").map(formattedData)
      setSides(sides);
      const beverages = data.filter((product) => product.category === "BEVERAGES").map(formattedData)
      setBeverages(beverages);
      const desserts = data.filter((product) => product.category === "DESSERTS").map(formattedData)
      setDesserts(desserts);
    }
    fetchData();
  }, []);

  const handleSelect = (eventKey) => setActiveKey(eventKey);

  const handleOpenProduct = (item) => {
    setItemDetails(item);
    setProductViewPopupOpen(!isProductViewPopupOpen);
  }

  const handleOpenOrderList = () => {
    const fetchData = async () => {
      try {
        const getDeskData = {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
        const response = await fetch(`http://localhost:8080/desks/${deskId}`, getDeskData)
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to get desks data.');
        }
        const mappedData = {
          id: data.id,
          number: data.number,
          status: data.status,
          places: data.places,
          cookingStatus: data.cookingStatus,
          orderItems: data.orderItems
        }
        setOrderList(mappedData.orderItems);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
    setOrderDetailsPopupOpen(!isOrderDetailsPopupOpen)
  }

  const handleAddToList = () => {
    async function updateDeskStatus() {
      // 
      try {
        const updateDeskStatus = {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        await fetch(`http://localhost:8080/desks/${parseInt(deskId, 10)}?status=TAKEN`, updateDeskStatus)
        window.location.reload();
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    updateDeskStatus();
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
              menuAppetizers.map(item => (
                <div className="product-view1 gray-overlay"
                  id="product"
                  onClick={() => handleOpenProduct(item)}
                  key={item.id}>
                  <img className="product-image-icon1" alt="" src={item.image} />
                  <div className="text-cantainer" id="text-container">
                    <p className="product_name" id="product_name">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            {activeKey === 'link-1' &&
              entrees.map((item, key) => (
                <div className="product-view1 gray-overlay"
                  id="product"
                  onClick={() => handleOpenProduct(item)}
                  key={item.id}>
                  <img className="product-image-icon1" alt="" src={item.image} />
                  <div className="text-cantainer" id="text-container">
                    <p className="product_name" id="product_name">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            {activeKey === 'link-2' &&
              sides.map((item, key) => (
                <div className="product-view1 gray-overlay"
                  id="product"
                  onClick={() => handleOpenProduct(item)}
                  key={item.id}>
                  <img className="product-image-icon1" alt="" src={item.image} />
                  <div className="text-cantainer" id="text-container">
                    <p className="product_name" id="product_name">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            {activeKey === 'link-3' &&
              desserts.map((item, key) => (
                <div className="product-view1 gray-overlay"
                  id="product"
                  onClick={() => handleOpenProduct(item)}
                  key={item.id}>
                  <img className="product-image-icon1" alt="" src={item.image} />
                  <div className="text-cantainer" id="text-container">
                    <p className="product_name" id="product_name">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            {activeKey === 'link-4' &&
              beverages.map((item, key) => (
                <div className="product-view1 gray-overlay"
                  id="product"
                  onClick={() => handleOpenProduct(item)}
                  key={item.id}>
                  <img className="product-image-icon1" alt="" src={item.image} />
                  <div className="text-cantainer" id="text-container">
                    <p className="product_name" id="product_name">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            <ProductView deskId={deskId} itemDetails={itemDetails} openProductViewPopup={isProductViewPopupOpen} onClose={handleOpenProduct} />
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
                <OrderDetails deskId={deskId} orderList={orderList} openOrderList={isOrderDetailsPopupOpen} onClose={handleOpenOrderList} />
                <div className="vector-wrapper">
                  <img className="vector-icon8" alt="" src="/vector5.svg" />
                </div>
              </button>
              <button className="add-to-list-btn" id="add_btn" onClick={handleAddToList}>
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
