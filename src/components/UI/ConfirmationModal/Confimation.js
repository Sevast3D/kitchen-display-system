import { React, useState, useEffect } from 'react'

import Modal from 'react-bootstrap/Modal';

import "./Confimation.css";

const Confimation = ({ title, message, action, showPopup, onClose }) => {

  const handleActions = (action) => {
    if (action === "removeProducts") {
      handleRemoveProducts();
    }
  }

  const handleRemoveProducts = () => {
    onClose();
    window.location.reload();
  }
  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="confimation">
        <p className="removing-tables-order" id="font-size-16">
          {title}
        </p>
        <div className="cleaning-msg1" id="cleaning_msg">
          <div className="are-you-sure">
            {message}
          </div>
        </div>
        <div className="btns1" id="btns_container">
          <button className="cleaning-close-btn1" onClick={onClose}>
            <div className="close1">Close</div>
          </button>
          <button className="cleaning-yes-btn1" onClick={() => handleActions(action)}>
            <b className="yes">Yes</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confimation;
