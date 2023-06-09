import "./Payment.css";
const Payment = ({ onClose }) => {
  return (
    <div className="payment">
      <p className="payment1" id="font-size-16">
        Payment
      </p>
      <div className="payment-method">
        <div className="credit-card" id="credit_card">
          <img className="mastercard-icon" alt="" src="/mastercard@2x.png" />
          <div className="menui-big-mac">Credit Card</div>
        </div>
        <div className="cash" id="cash">
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
      <div className="btns5" id="btns_container">
        <button className="close10" onClick={onClose}>
          <div className="close11">Close</div>
        </button>
        <button className="pay3">
          <b className="pay4">Pay</b>
        </button>
      </div>
    </div>
  );
};

export default Payment;
