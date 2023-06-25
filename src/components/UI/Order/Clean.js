import { useEffect } from "react";
import "./Clean.css";

import Modal from 'react-bootstrap/Modal';

const Clean = ({deskId, openClean, onClose }) => {

  const handleClean = () => {
    async function updateDeskStatus() {
      // 
      try {
        const updateDeskStatus = {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }
        const response = await fetch(`http://localhost:8080/desks/${parseInt(deskId, 10)}?status=EMPTY`, updateDeskStatus)
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
    updateDeskStatus();
  }
  return (
    <Modal show={openClean} onHide={onClose} animation={false} centered>
      <div className="clean-popup">
        <p className="cleaning" id="font-size-16">
          Cleaning
        </p>
        <div className="cleaning-msg-div" id="cleaning_msg">
          <div className="are-you-sure">
            Are you sure that you want to mark the desk as clean?
          </div>
        </div>
        <div className="btns" id="btns_container">
          <button className="cleaning-close-btn" onClick={onClose}>
            <div className="close2">Close</div>
          </button>
          <button className="cleaning-yes-btn" onClick={handleClean}>
            <b className="yes">Yes</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Clean;
