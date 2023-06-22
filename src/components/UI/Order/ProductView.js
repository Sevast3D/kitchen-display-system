import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import "./ProductView.css";
import { useEffect, useState, useRef } from "react";
import AddOrder from "./AddOrder";

const ProductView = ({ deskId, itemDetails, openProductViewPopup, onClose }) => {
  const [orderList, setOrderList] = useState([]);
  const [counter, setCounter] = useState(1);
  const [price, setPrice] = useState(itemDetails.price);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const specRef = useRef();

  useEffect(() => {
    setPrice(itemDetails.price);
    // console.log(orderList)
  }, [itemDetails]);

  let productPrice = itemDetails.price;

  const handleIncrease = () => {
    setCounter(counter + 1);
    setPrice(price + productPrice)
  }

  const handleDecrese = () => {
    if (counter > 1) setCounter(counter - 1);
    if (price > productPrice) setPrice(price - productPrice);
  }

  const handleClose = () => {
    setShowPopup(false);
  }


  const addProduct = () => {
    const spec = specRef.current.value;

    async function addProductsToList() {
      // 
      try {
        // const imageURL = await uploadImageToStorage();
        const addProduct = {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({
            productId: itemDetails.id,
            specification: spec,
            amount: counter,
            deskId: deskId
          }),
        }

        await fetch('http://localhost:8080/orders', addProduct)

        setCounter(1);
        // window.location.reload();
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    addProductsToList();

    // console.log(orderList);
    // setShowAddOrder(true);
  }

  const onCloseProduct = () => {
    setCounter(1);
  }

  return (
    <Modal show={openProductViewPopup} onHide={onCloseProduct} animation={false} centered backdrop={false}>

      <div className="product-view">
        <img
          className="product-image-icon"
          alt=""
          id="product_image"
          src={itemDetails.image}
        />
        <div className="product-main" id="product_data_container">
          <p className="amount" id="product_name">
            {itemDetails.name}
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
            {itemDetails.components}
          </p>
        </div>
        <Form.Group className="textareastandard-formgroup">
          <Form.Control as="textarea" placeholder="Specifications" ref={specRef} />
        </Form.Group>
        <div className="buttons" id="btn_contrainer">
          <div onClick={onCloseProduct}>
            <button className="delete-btn" id="delete_btn" onClick={onClose}>
              <img className="vector-icon3" alt="" src="/vector2.svg" />
            </button>
          </div>
          <div onClick={addProduct} id="add_action">
            <button className="add-btn" id="add_btn" onClick={onClose}>
              <p className="font-size-16 text-white bold">Add</p>
            </button>
          </div>
          {
            showAddOrder && <AddOrder
              list={orderList}
              showPopup={showPopup}
              onClose={handleClose} />
          }
        </div>
      </div>
    </Modal>
  );
};

export default ProductView;
