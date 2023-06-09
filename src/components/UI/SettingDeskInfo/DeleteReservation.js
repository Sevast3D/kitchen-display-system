import { React, useState, useRef } from 'react'

import "./DeleteReservation.css";
import Modal from 'react-bootstrap/Modal';

const DeleteReservation = ({ title, actionBtn, showPopup, onClose }) => {
  const inputDataRef = useRef();
  const [error, setError] = useState("");

  const handleAddDesk = () => {
    const inputData = inputDataRef.current.value;
    console.log(inputData)
    onClose();
  }
  const handleRemoveRez = () => {
    const inputData = inputDataRef.current.value;
    console.log("Removing" + inputData);
    if (inputData != "") {
      window.location.reload();
    } else {
      setError("Invalid ID!");
    }
  }

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="delete-reservation">
        <p className="delete-reservation1" id="font-size-16">
          {title}
        </p>
        <input
          className="cleaning-msg"
          type='number'
          placeholder={actionBtn === "Add" ? "Enter Table Capacity" : "ID"}
          ref={inputDataRef}
          id="inputData"
        />
        <div className="event-row error">
          {error}
        </div>
        <div className="btns" id="btns_container">
          <button className="cleaning-close-btn" onClick={onClose}>
            <div className="close">Close</div>
          </button>
          <button className="cleaning-yes-btn" onClick={actionBtn === "Add" ? handleAddDesk : handleRemoveRez}>
            <b className="delete">{actionBtn}</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteReservation;
