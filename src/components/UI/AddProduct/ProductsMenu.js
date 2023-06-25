import { React, useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import "./ProductsMenu.css";

import AddProduct from './AddProduct';
import ProductView from './ProductView';

const ProductsMenu = ({ showPopup, onClose }) => {
  // const [orderList] = useState([[2, "Burger Vita", 25.6, "https://acconstorage.blob.core.windows.net/acconpictures/202105111217_WRJ1_.jpeg", "Appertizer", "2 Chifle, cascaval topit, sorie, sos de ustroi, ceapa"], [2, "Burger", 27.5, "https://acconstorage.blob.core.windows.net/acconpictures/202105111215_OMFY_.jpeg"], [1, "Salata Cessar", 55.40, "https://www.rainbowls.ro/assets/images/gallery/salata1.jpg"], [1, "Salata Crabi", 50.4]]);
  const [orderList, setOrderList] = useState([]);
  const [selected, setSelected] = useState("none");
  const [isAddProductPopup, setAddProductPopUp] = useState(false);
  const [error, setError] = useState("");
  const [isProductView, setProductView] = useState(false);
  const [productData, setProductData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  // Filter the orderList based on the search term
  const filteredList = orderList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };


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
      const formattedData = data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        components: product.components,
        category: product.category
      }))
      setOrderList(formattedData);
    }
    fetchData();
  }, []);

  const handleOnSelect = (product) => {
    setSelected(product.id);
    setProductData(product);
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
        <input className="cleaning-msg" type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
        {
          filteredList.slice(0, 10).map((item, index) => (
            <button key={item.id} className={`product-product-menu
            ${selected === item.id ? "selected-button" : ""}
            `}
              onClick={() => handleOnSelect(item)}>
              <div className="product-name-productmenu">{item.name}</div>
              <div className="product-name-productmenu">{item.price} Lei</div>
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
          <ProductView productData={productData} showPopup={isProductView} onClose={handleOnViewProduct} />
        </div>
      </div>
    </Modal>
  );
};

export default ProductsMenu;
