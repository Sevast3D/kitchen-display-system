import { Modal } from "react-bootstrap";
import { useEffect, useState } from 'react';
import "./OrderDetails.css";

const OrderDetails = ({ orderList, openOrderList, onClose }) => {
  const [sortedOrderList, setSortedOrderList] = useState([])

  useEffect(() => {
    const sortedOrderList = orderList.sort((a, b) => {
      if (a.status === "NOT_COOKED" && b.status === "COOKED") {
        return -1; // a comes before b
      } else if (a.status === "COOKED" && b.status === "NOT_COOKED") {
        return 1; // b comes before a
      } else {
        return 0; // no need to change the order
      }
    });
    setSortedOrderList(sortedOrderList)
  }, [orderList]);


  const handleDelete = (itemToDelete) => {

    async function deleteOrderItem(item) {
      // 
      try {
        const deleteOrderItemRequest = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        await fetch(`http://localhost:8080/orders/${parseInt(item, 10)}`, deleteOrderItemRequest)
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    deleteOrderItem(itemToDelete.id);
  }
  const handleClose = ()=> {
    onClose();
  }
  return (
    <Modal show={openOrderList} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="order-details">
        <p className="order-list" id="font-size-16">
          Order List
        </p>

        {sortedOrderList.map((item) => {
          let result = [];
          if (item.status === "NOT_COOKED") {
            result.push(
              <div className="products" id="product" key={item.id}>
                <div className="name" id="product_top_container">
                  <div className="product-name" id="product_name_container">
                    <p className="x" id="product_count">
                      {item.amount}x
                    </p>
                    <p className="product-name1" id="product_name">
                      {item.product.name}
                    </p>
                  </div>
                  <button className="x1" id="delete_btn" onClick={() => handleDelete(item)}>
                    <img className="vector-icon4" alt="" src="/vector3.svg" />
                    <img className="vector-icon4" alt="" src="/vector4.svg" />
                  </button>
                </div>
                <div className="specification" id="product_specification">
                  <p className="rare-spicy-chimichurri" id="product_components">
                    - {item.product.components}
                  </p>
                  {
                    (item.specification !== "" ? <>
                      <p className="no-parmesan" id="product_specification">
                        - {item.specification}
                      </p></> : "")
                  }
                </div>
              </div>
            );
          } else {
            result.push(
              <div className="products lower-opacity" id="product" key={item.id}>
                <div className="name" id="product_top_container">
                  <div className="product-name" id="product_name_container">
                    <p className="x" id="product_count">
                      {item.amount}x
                    </p>
                    <p className="product-name1" id="product_name">
                      {item.product.name}
                    </p>
                  </div>
                </div>
                {
                  item.specification !== "" ? <> <div className="specification" id="product_specification">
                    <p className="no-parmesan" id="product_specification">
                      - {item.specification}
                    </p>
                  </div></> : ""
                }
              </div>
            );
          }
          return result
        })}

        <div className="close-wrapper" onClick={handleClose}>
          <div className="close">Close</div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetails;
