import { useState, useCallback } from "react";

import "./Desk.css";

import OrderMenu from "../Order/AddOrder.js"
import Payment from "../Order/Payment.js"
import CleanPopup from "../Order/Clean.js"

import Dolar from "./Assets/dollarsign.svg";
import Eat from "./Assets/eat.svg";
import Clean from "./Assets/clean.svg";


function getDeskStatus(value) {
  if (value === "TAKEN") {
    return "orange";
  } else if (value === "RESERVED") {
    return "red";
  } else if (value === "CLEAN_UP") {
    return "green";
  }
}

const Desk = ({deskData}) => {
  let currentTime = new Date();

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
    <div className={`desk ${getDeskStatus(deskData.status)}`} id="desk">
      <div className="button" id="button_container">
        <div className="status-button" id="buttons_container2">
          <button onClick={handleButtonClick} className="add-btn">
            <img className="vector-icon" alt="" src=
              {deskData.status === "CLEAN_UP" ? Clean : Eat} />
            <div className="font-size-16">
              {deskData.status === "CLEAN_UP" ? "Clean" : "Add"}
            </div>
          </button>
          {deskData.status === "CLEAN_UP" ? (
            <CleanPopup openClean={showCleanPopup} onClose={handleCloseClean} />
          ) : (
            <OrderMenu showPopup={showPopup} onClose={handleClose} />
          )}
          <button onClick={handleOpenPayment} className={`pay ${deskData.status === "EMPTY" || deskData.status === "CLEAN_UP" ? `hidden` : ``}`}>
            <img className="dollar-sign-icon" alt="" src={Dolar} />
            <div className="font-size-16">Pay</div>
          </button><Payment openPayment={showPaymentPopup} onClose={handleOpenPayment} />
        </div>
      </div>
      <div className="middle-text" id="middle_text">
        <p className="p" id="desk_number">
          {deskData.id}
        </p>
        <div className="status" id="status_label">
          <div className="status1">Status:</div>
          <p className="empty" id="status">
            {deskData.status}
          </p>
        </div>
        <p className={`pm ${deskData.status === "TAKEN" || deskData.status === "RESERVED" ? `visible` : ``}`} id="time">
          {currentTime.toLocaleTimeString()}
        </p>
      </div>
      <div className={`title ${getDeskStatus(deskData.status)}`} id="title">
        <p className="empty">Desk</p>
      </div>
    </div>
  );
};

export default Desk;
