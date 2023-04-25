import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import "./ProductView.css";
import { useEffect, useState } from "react";
import AddOrder from "./AddOrder";

let orderList = []

const ProductView = ({ itemDetails, openProductViewPopup, onClose }) => {
  const [counter, setCounter] = useState(1);
  const [price, setPrice] = useState(itemDetails[3]);
  const [spec, setSpec] = useState("");


  useEffect(() => {
    setPrice(itemDetails[3]);
  }, [itemDetails]);

  let productPrice = itemDetails[3];

  const handleIncrease = () => {
    setCounter(counter + 1);
    setPrice(price + productPrice)
  }
  const handleDecrese = () => {
    if (counter > 1) setCounter(counter - 1);
    if (price > productPrice) setPrice(price - productPrice);
  }
  
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () =>{
    setShowPopup(false);
  }

  const addProduct = (amount, specifications) => {
    setCounter(1);
    orderList.push(addProduct, specifications);
    <AddOrder list={orderList} showPopup = {showPopup} onClose={handleClose} />
    console.log(orderList);
  }

  const onCloseProduct = () => {
    setCounter(1);
  }

  const handleChange = (event) => {
    setSpec(event.target.value);
  }

  return (
    <Modal show={openProductViewPopup} onHide={onCloseProduct} animation={false} centered backdrop={false}>

      <div className="product-view">
        <img
          className="product-image-icon"
          alt=""
          id="product_image"
          src={itemDetails[2]}
        />
        <div className="product-main" id="product_data_container">
          <p className="amount" id="product_name">
            {itemDetails[1]}
          </p>
          <p className="lei" id="price">
            {Number(price).toFixed(2) + " lei"}
          </p>
          <div className="quantity" id="amount_contrainer">
            <button className="minus" id="minus" onClick={handleDecrese}>
              <img className="vector-icon" alt="" src="/vector.svg" />
            </button>
            <p className="amount" id="count_number">
              {counter}
            </p>
            <button className="minus" id="plus" onClick={handleIncrease}>
              <img className="vector-icon1" alt="" src="/vector1.svg" />
              <img className="vector-icon" alt="" src="/vector.svg" />
            </button>
          </div>
        </div>
        <div>
          <p className="font-size-16 buttons">
            {itemDetails[4]}
          </p>
        </div>
        <Form.Group className="textareastandard-formgroup">
          <Form.Control as="textarea" placeholder="Specifications" onChange={handleChange} />
        </Form.Group>
        <div className="buttons" id="btn_contrainer">
          <div onClick={onCloseProduct}>
          <button className="delete-btn" id="delete_btn" onClick={onClose}>
            <img className="vector-icon3" alt="" src="/vector2.svg" />
          </button>
          </div>
          <div onClick={() => {addProduct(counter, spec)}} id="add_action">
            <button className="add-btn" id="add_btn" onClick={onClose}>
              <p className="font-size-16 text-white bold">Add</p>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductView;
