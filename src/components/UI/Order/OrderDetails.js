import { Modal } from "react-bootstrap";
import { useEffect, useState } from 'react';
import "./OrderDetails.css";

const OrderDetails = ({ openOrderList, onClose }) => {
  // Porduct Quantity/ Poduct Name/ Restricions / Status Cooked
  const [orderList, setOrderList] = useState([[2, "Shaorma Mare", "Fara cartofi", 0], [2, "Burger", "Fara ceapa", 0], [1, "Salata", "Alergic Alune", 1]]);
  orderList.sort((a, b) => a[a.length - 1] - b[b.length - 1]);
  
  const handleDelete = (itemToDelete) => {
    const wasModalOpen = openOrderList;

    const newList = orderList.filter((item) => item !== itemToDelete);
    setOrderList(newList);
  }
  return (
    <Modal show={openOrderList} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="order-details">
        <p className="order-list" id="font-size-16">
          Order List
        </p>

        {orderList.map((item) => {
          let result = [];
          if (item[item.length - 1] === 0) {
            result.push(
              <div className="products" id="product">
                <div className="name" id="product_top_container">
                  <div className="product-name" id="product_name_container">
                    <p className="x" id="product_count">
                      {item[0]}x
                    </p>
                    <p className="product-name1" id="product_name">
                      {item[1]}
                    </p>
                  </div>
                  <button className="x1" id="delete_btn" onClick={() => handleDelete(item)}>
                    <img className="vector-icon4" alt="" src="/vector3.svg" />
                    <img className="vector-icon4" alt="" src="/vector4.svg" />
                  </button>
                </div>
                <div className="specification" id="product_specification">
                  <p className="no-parmesan" id="product_specification">
                    - {item[2]}
                  </p>
                </div>
              </div>
            );
          } else {
            result.push(
              <div className="products lower-opacity" id="product">
                <div className="name" id="product_top_container">
                  <div className="product-name" id="product_name_container">
                    <p className="x" id="product_count">
                      {item[0]}x
                    </p>
                    <p className="product-name1" id="product_name">
                      {item[1]}
                    </p>
                  </div>
                </div>
                <div className="specification" id="product_specification">
                  <p className="no-parmesan" id="product_specification">
                    - {item[2]}
                  </p>
                </div>
              </div>
            );
          }
          return result
        })}

        <div className="close-wrapper" onClick={onClose}>
          <div className="close">Close</div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetails;
