import { useState, useCallback } from "react";

import "./Desk.css";

import OrderMenu from "../Order/AddOrder.js"
import Payment from "../Order/Payment.js"
import CleanPopup from "../Order/Clean.js"

import Dolar from "./Assets/dollarsign.svg";
import Eat from "./Assets/eat.svg";
import Clean from "./Assets/clean.svg";
import { useEffect } from "react";


function getDeskStatus(value) {
  if (value === "TAKEN") {
    return "orange";
  } else if (value === "RESERVED") {
    return "red";
  } else if (value === "CLEAN_UP") {
    return "green";
  } else return ""
}

const Desk = ({ deskData, time }) => {
  let currentTime = new Date();

  const [showPopup, setShowPopup] = useState(false);
  const [orderList, setOrderList] = useState(false);
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
    const fetchData = async () => {
      try {
        const getDeskData = {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
        const response = await fetch(`http://localhost:8080/desks/${deskData.id}`, getDeskData)
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to get desks data.');
        }
        const mappedData = {
          id: data.id,
          number: data.number,
          status: data.status,
          places: data.places,
          cookingStatus: data.cookingStatus,
          orderItems: data.orderItems
        }
        setOrderList(mappedData.orderItems);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
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
            <CleanPopup deskId={deskData.id} openClean={showCleanPopup} onClose={handleCloseClean} />
          ) : (
            <OrderMenu deskId={deskData.id} showPopup={showPopup} onClose={handleClose} />
          )}
          <button onClick={handleOpenPayment} className={`pay ${deskData.status === "EMPTY" || deskData.status === "CLEAN_UP" || deskData.status === "RESERVED" ? `hidden` : ``}`}>
            <img className="dollar-sign-icon" alt="" src={Dolar} />
            <div className="font-size-16">Pay</div>
          </button>
          <Payment deskId={deskData.id} orderList={orderList} openPayment={showPaymentPopup} onClose={handleOpenPayment} />
        </div>
      </div>
      <div className="middle-text" id="middle_text">
        <p className="p" id="desk_number">
          {deskData.number}
        </p>
        <div className="status" id="status_label">
          <div className="status1">Status:</div>
          <p className="empty" id="status">
            {deskData.status === "CLEAN_UP" ? "Clean Up" : ""}
            {deskData.status === "EMPTY" ? "Empty" : ""}
            {deskData.status === "TAKEN" ? "Taken" : ""}
            {deskData.status === "RESERVED" ? "Reserved" : ""}
          </p>
        </div>
        <p className={`pm ${deskData.status === "TAKEN" || deskData.status === "RESERVED" ? `visible` : ``}`} id="time">
          {deskData.status !== "RESERVED" ? "" : (time.toLocaleTimeString())}
        </p>
      </div>
      <div className={`title ${getDeskStatus(deskData.status)}`} id="title">
        <p className="empty">Desk</p>
      </div>
    </div>
  );
};

export default Desk;
