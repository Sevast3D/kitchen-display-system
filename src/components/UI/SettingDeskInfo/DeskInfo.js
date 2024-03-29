import { React, useState } from 'react'

import Modal from 'react-bootstrap/Modal';

import "./DeskInfo.css";

import RemoveAprove from '../ConfirmationModal/Confimation';
import DeleteReservation from './DeleteReservation';

const DeskInfo = ({ deskData, showPopup, onClose }) => {
  const [orderList] = useState([[2, "Burger Vita"], [2, "Burger"], [1, "Salata"], [1, "Salata"]]);
  const [isRemoveProductPopup, setRemoveProductsPopup] = useState(false);
  const [isDeleteReservation, setDeleteReservation] = useState(false);

  const handleOnRemoveProducts = () => {
    setRemoveProductsPopup(!isRemoveProductPopup);
  }

  const handleOnDeleteReservation = () => {
    setDeleteReservation(!isDeleteReservation);
  }

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="desk-info">
        <div className="close-btn" id="top-bar-container" onClick={onClose}>
          <p className="table-info-deskInfo" id="font-size-16">
            Table Info
          </p>
          <button className="x" id="close-btn" onClick={onClose}>
            <img className="vector-icon-deskInfo" alt="" src="/vector3.svg" />
            <img className="vector-icon-deskInfo" alt="" src="/vector4.svg" />
          </button>
        </div>
        <div className="desk-parent">
          <div className={`desk-deskInfo 
                ${deskData[1] === 0 ? "gray-body2" : ""}
                ${deskData[1] === 2 ? "red-body2" : ""}          
                ${deskData[1] === 3 ? "green-body2" : ""}          
              ` }
            id="desk">
            <div className="middle-text-deskInfo" id="middle_text">
              <p className="deskNumber-deskInfo">{deskData[0]}</p>
              <div className="status-deskInfo" id="status_label">
                <div className="amount-text-deskinfo">Status:</div>
                <p className="empty font-size-14" id="status">
                  {deskData[1] === 0 && 'Empty'}
                  {deskData[1] === 1 && 'Taken'}
                  {deskData[1] === 2 && 'Reserved'}
                  {deskData[1] === 3 && 'Clean Up'}
                </p>
              </div>
              <p className="time-deskInfo" id="time">
                01:34:02 PM
              </p>
            </div>
            <div
              className={`title-deskInfo 
                ${deskData[1] === 0 ? "gray-title2" : ""}
                ${deskData[1] === 2 ? "red-title2" : ""}          
                ${deskData[1] === 3 ? "green-title2" : ""}          
              ` }
              id="title">
              <p className="table-info-deskInfo text-white font-size-32">Desk</p>
            </div>
          </div>
          <div className="text-container-deskinfo">
            <div className="firstline-container-deskinfo">
              <div className="places-deskinfo">
                <div className="taken">Places</div>
                <div className="div">4</div>
              </div>
              <div className="places-deskinfo">
                <div className="taken">Payment Amount</div>
                <div className="lei">120.42 Lei</div>
              </div>
            </div>
            <div className="secondline-container-deskinfo">
              <div className="taken">Order List</div>
              {
                orderList.map((item) => (
                  <div className="product-info">
                    <div className="amount-text-deskinfo">{item[0]} x</div>
                    <div className="product-name-deskinfo">{item[1]}</div>
                  </div>
                ))
              }
            </div>
            <div className="secondline-container-deskinfo">
              <div className="taken">Rezervation list</div>
              <div className="date-id-deskinfo">
                <div className="date-deskinfo">01/01/2024 09:00 PM</div>
                <div className="id-deskinfo"> ID: 12</div>
              </div>
            </div>
          </div>
        </div>
        <div className="btns2" id="btns_container">
          <button className="action-btn-deskInfo" onClick={handleOnRemoveProducts}>
            <b className="remove-products">Remove Products</b>
          </button>
          <RemoveAprove title="Removing Table’s Order List" message="Are you sure that you want to remove the products from the desk?" action="removeProducts" showPopup={isRemoveProductPopup} onClose={handleOnRemoveProducts} />
          <button className="action-btn-deskInfo" onClick={handleOnDeleteReservation}>
            <b className="remove-products">Delete Reservation</b>
          </button>
          <DeleteReservation title="Delete Reservation by ID" actionBtn="Delete" showPopup={isDeleteReservation} onClose={handleOnDeleteReservation} />
        </div>
      </div>
    </Modal>
  );
};

export default DeskInfo;
