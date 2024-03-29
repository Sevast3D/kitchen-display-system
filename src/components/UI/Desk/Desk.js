import { useState, useCallback } from "react";

import "./Desk.css";

import OrderMenu from "../Order/AddOrder.js"
import Payment from "../Order/Payment.js"
import CleanPopup from "../Order/Clean.js"

import Dolar from "./Assets/dollarsign.svg";
import Eat from "./Assets/eat.svg";
import Clean from "./Assets/clean.svg";


function getDeskStatus(value) {
  if (value === 1) {
    return "orange";
  } else if (value === 2) {
    return "red";
  } else if (value === 3) {
    return "green";
  }
}


const Desk = (props) => {
  let currentTime = new Date();
  let orderList = []

  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentPopup, setPaymentPopup] = useState(false);
  const [showCleanPopup, setCleanPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
    setCleanPopup(!showCleanPopup);
  }

  const handleClose = () => {
    setShowPopup(false);
  }

  const handleCloseClean = () => {
    setCleanPopup(false);
  }

  const handleOpenPayment = () => {
    setPaymentPopup(!showPaymentPopup);
  }



  return (
    <div className={`desk ${getDeskStatus(props.value[1])}`} id="desk">
      <div className="button" id="button_container">
        <div className="status-button" id="buttons_container2">
          <button onClick={handleButtonClick} className="add-btn">
            <img className="vector-icon" alt="" src=
              {props.value[1] === 3 ? Clean : Eat} />
            <div className="font-size-16">
              {props.value[1] === 3 ? "Clean" : "Add"}
            </div>
          </button>
          {props.value[1] === 3 ? (
            <CleanPopup openClean={showCleanPopup} onClose={handleCloseClean} />
          ) : (
            <OrderMenu list={orderList} showPopup={showPopup} onClose={handleClose} />
          )}
          <button onClick={handleOpenPayment} className={`pay ${props.value[1] === 0 || props.value[1] === 3 ? `hidden` : ``}`}>
            <img className="dollar-sign-icon" alt="" src={Dolar} />
            <div className="font-size-16">Pay</div>
          </button><Payment openPayment={showPaymentPopup} onClose={handleOpenPayment} />
        </div>
      </div>
      <div className="middle-text" id="middle_text">
        <p className="p" id="desk_number">
          {props.value[0]}
        </p>
        <div className="status" id="status_label">
          <div className="status1">Status:</div>
          <p className="empty" id="status">
            {props.value[1] === 0 && 'Empty'}
            {props.value[1] === 1 && 'Taken'}
            {props.value[1] === 2 && 'Reserved'}
            {props.value[1] === 3 && 'Clean Up'}
          </p>
        </div>
        <p className={`pm ${props.value[1] === 1 || props.value[1] === 2 ? `visible` : ``}`} id="time">
          {currentTime.toLocaleTimeString()}
        </p>
      </div>
      <div className={`title ${getDeskStatus(props.value[1])}`} id="title">
        <p className="empty">Desk</p>
      </div>
    </div>
  );
};

export default Desk;
