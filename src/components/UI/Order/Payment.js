import { useState, useEffect } from 'react'
import "./Payment.css";

import Modal from 'react-bootstrap/Modal';

const Payment = ({deskId, orderList, openPayment, onClose }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [finalList, setFinalList] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setFinalList(orderList || [])
  }, [orderList])

  useEffect(() => {
    const totalPrice = finalList.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    setTotal(totalPrice)
  }, [finalList])

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePay = () => {
    const fetchData = async () => {
      try {
        const payments = {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        const response = await fetch(`http://localhost:8080/desks/${deskId}/payments`, payments)
        if (!response.ok) {
          throw new Error('Failed to do the payment.');
        }
        window.location.reload();
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
  }
  return (
    <Modal show={openPayment} onHide={onClose} animation={false} centered>
      <div className="payment">
        <p className="payment1" id="font-size-16">
          Payment
        </p>
        <div className="payment-method">
          <div
            className={`credit-card ${selectedPaymentMethod === 'credit-card' ? 'selected' : ''}`}
            id="credit_card"
            onClick={() => handlePaymentMethodClick('credit-card')}
          >
            <img className="mastercard-icon" alt="" src="/mastercard@2x.png" />
            <div className="menui-big-mac">Credit Card</div>
          </div>
          <div
            className={`cash ${selectedPaymentMethod === 'cash' ? 'selected' : ''}`}
            id="cash"
            onClick={() => handlePaymentMethodClick('cash')}
          >
            <img className="euro-icon" alt="" src="/euro@2x.png" />
            <div className="menui-big-mac">Cash</div>
          </div>
        </div>
        <div className="bill-details" id="bill_text_container">
          <b className="billed-details">Billed Details</b>
          <div className="cart-items" id="product_info_container">
            {
              finalList.map(item => (
                <div className="payment-method" key={item.id}>
                  <div className="menui-big-mac">{item.product.name}</div>
                  <div className="menui-big-mac">{item.price.toFixed(1)} Lei</div>
                </div>
              ))
            }
          </div>
          <div className="bill-details-child" />
          <div className="payment-method" id="price_container">
            <b className="to-pay">To Pay</b>
            <b className="to-pay">{total} Lei</b>
          </div>
        </div>
        <div className="btns" id="btns_container">
          <button className="close" onClick={onClose}>
            <div className="close1">Close</div>
          </button>
          <button className="pay-btn" onClick={handlePay}>
            <b className="pay1">Pay</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Payment;
