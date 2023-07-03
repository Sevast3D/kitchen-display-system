import { React, useState, useRef } from 'react'

import "./DeleteReservation.css";
import Modal from 'react-bootstrap/Modal';

const DeleteReservation = ({ title, actionBtn, showPopup, onClose }) => {
  const inputDataRef = useRef();
  const [error, setError] = useState("");

  const handleAddDesk = () => {
    try {
      const getAllDesks = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      }

      const inputData = inputDataRef.current.value;
      fetch(`http://localhost:8080/desks?places=${parseInt(inputData, 10)}`, getAllDesks)

    }
    catch (error) {
      // Handle the error
      console.error(error);
    }
    window.location.reload();
  }

  const handleRemoveRez = () => {
    const inputData = parseInt(inputDataRef.current.value, 10);

    async function deleteReservation() {
      // 
      try {
        const deleteReservation = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        await fetch(`http://localhost:8080/reservations/${parseInt(inputData, 10)}`, deleteReservation)

        window.location.reload();
      }
      catch (error) {
        // Handle the error
        setError("Invalid ID!");
        console.error(error);
      }
    }
    if (inputData != "") {
      deleteReservation();
      console.log("Removing " + inputData);
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
