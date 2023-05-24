import { useEffect } from "react";
import "./Clean.css";

import Modal from 'react-bootstrap/Modal';

const Clean = ({openClean, onClose }) => {
  return (
    <Modal show={openClean} onHide={onClose} animation={false} centered>
      <div className="clean-popup">
        <p className="cleaning" id="font-size-16">
          Cleaning
        </p>
        <div className="cleaning-msg" id="cleaning_msg">
          <div className="are-you-sure">
            Are you sure that you want to mark the desk as clean?
          </div>
        </div>
        <div className="btns" id="btns_container">
          <button className="cleaning-close-btn" onClick={onClose}>
            <div className="close2">Close</div>
          </button>
          <button className="cleaning-yes-btn">
            <b className="yes">Yes</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Clean;
