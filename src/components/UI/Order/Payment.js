import { useState } from 'react'
import "./Payment.css";

import Modal from 'react-bootstrap/Modal';

const Payment = ({ openPayment, onClose }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

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
            <div className="payment-method">
              <div className="menui-big-mac">Menui Big Mac</div>
              <div className="menui-big-mac">20.90 Lei</div>
            </div>
          </div>
          <div className="bill-details-child" />
          <div className="payment-method" id="price_container">
            <b className="to-pay">To Pay</b>
            <b className="to-pay">67.33 Lei</b>
          </div>
        </div>
        <div className="btns" id="btns_container">
          <button className="close" onClick={onClose}>
            <div className="close1">Close</div>
          </button>
          <button className="pay-btn">
            <b className="pay1">Pay</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Payment;
