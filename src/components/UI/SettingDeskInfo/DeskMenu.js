import { React, useState } from 'react'

import "./DeskMenu.css";

import Modal from 'react-bootstrap/Modal';

import trash from './assets/trash.png'
import AddPopUp from "./DeleteReservation"
import ViewDesk from "./DeskInfo"

const DeskList = [[1, 0], [4, 1], [45, 3], [2, 3], [12, 2], [33, 1], [7, 2], [19, 0], [26, 3], [41, 2], [50, 1]]


const DeskMenu = ({ onClose, showPopup }) => {
  const [selected, setSelected] = useState("none");
  const [isAddPopUpOpen, setAddPopUp] = useState(false);
  const [isViewDeskOpen, setViewDesk] = useState(false);
  const [error, setError] = useState("");
  const [deskData, setDeskData] = useState([]);

  const handleOnSelect = (index) => {
    setSelected(index);
    setDeskData(DeskList[index]);
  }

  const handleOnAdd = () => {
    setAddPopUp(!isAddPopUpOpen)
  }

  const handleOnViewDesk = () => {
    if(selected === "none"){
      setError("Please select a desk.")
    }else{
      setError("");
      setViewDesk(!isViewDeskOpen);
    }
  }

  const handleoOnDelete = () =>{
    // console.log(DeskList[selected][0]);
    console.log(selected);
    if(selected === "none"){
      setError("Please select a desk.")
    }else if(DeskList[selected][1] != 0){
      setError("Error, the desk status is not empty!");
    }else{
      setError("");
    }
  }
  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered>
      <div className="desk-menu">
        <div className="close-btn1" id="top-bar-container" onClick={onClose}>
          <p className="desk-menu-text" id="font-size-16">
            Desk Menu
          </p>
          <button className="x1" id="close-btn" onClick={onClose}>
            <img className="vector-icon2" alt="" src="/vector3.svg" />
            <img className="vector-icon2" alt="" src="/vector4.svg" />
          </button>
        </div>
        <div className="desk-menu-container" id="desk-menu-container">
          {
            DeskList.map((item, index) => (
              <div
                className={`small-desk2
                ${selected === index ? "selectedDesk" : ""}
                ${item[1] === 1 ? "orange-body" : ""}
                ${item[1] === 2 ? "red-body" : ""}
                ${item[1] === 3 ? "green-body" : ""}
                `}
                onClick={() => handleOnSelect(index)}
                id="small desk"
                key={index}
              >
                <div
                  className={`name-text 
                  ${item[1] === 1 ? "orange-title" : ""}
                  ${item[1] === 2 ? "red-title" : ""}
                  ${item[1] === 3 ? "green-title" : ""}
                  `}
                  id="small desk title"
                >
                  <b className="desk-title-text">Desk</b>
                </div>
                <div className="desk-data" id="small desk data">
                  <b className="desk-number">{item[0]}</b>
                  <div className="status " id="status_label">
                    <p className="empty font-size-14" id="status">
                      {item[1] === 0 && 'Empty'}
                      {item[1] === 1 && 'Taken'}
                      {item[1] === 2 && 'Reserved'}
                      {item[1] === 3 && 'Clean Up'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="event-row error">
          {error}
        </div>
        <div className="desk-menu-btns-container">
          <div className="add-del-btns">
            <button className="add-table-deskmenu" onClick={handleOnAdd}>
              <div className="add-deskmenu">Add</div>
            </button>
            <AddPopUp title={"Add a new Desk"} input={"Place Number"} actionBtn={"Add"} showPopup={isAddPopUpOpen} onClose={handleOnAdd}/>
            <button className='remove-tabledeskmenu' onClick={handleoOnDelete}>
              <img
                className="delete-undefined"
                alt=""
                src={trash}
              />
            </button>
          </div>
          <button className="view-desk-btn" onClick={handleOnViewDesk}>
            <b className="view-desk">View Desk</b>
          </button>
          <ViewDesk deskData={deskData} showPopup={isViewDeskOpen} onClose={handleOnViewDesk}/>
        </div>
      </div>
    </Modal>
  );
};

export default DeskMenu;
