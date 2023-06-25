import { React, useState } from 'react'

import "./DeskMenu.css";

import Modal from 'react-bootstrap/Modal';

import trash from './assets/trash.png'
import AddPopUp from "./DeleteReservation"
import ViewDesk from "./DeskInfo"

const DeskMenu = ({ allDesks, onClose, showPopup }) => {
  const [selected, setSelected] = useState("none");
  const [isAddPopUpOpen, setAddPopUp] = useState(false);
  const [isViewDeskOpen, setViewDesk] = useState(false);
  const [error, setError] = useState("");
  const [deskId, setDeskId] = useState(0);
  const [deskData, setDeskData] = useState([])

  const handleOnSelect = (item) => {
    // setDeskId(item.Id);
    setSelected(item);
  }

  const handleOnAdd = () => {
    setAddPopUp(!isAddPopUpOpen)
  }

  const handleOnViewDesk = () => {
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
        const response = await fetch(`http://localhost:8080/desks/${selected.id}`, getDeskData)
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
          orderItems: data.orderItems,
          reservations: data.reservations
        }
        setDeskData(mappedData);

        setViewDesk(!isViewDeskOpen);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    if (selected === null || selected === undefined) {
      setError("Please select a desk.")
    } else {
      setError("");
      fetchData();
    }
  }

  const handleoOnDelete = () => {
    if (selected === null || selected === undefined) {
      setError("Please select a desk.")
    } else if (selected.status !== "EMPTY") {
      setError("Error, the desk status is not empty!");
    } else {
      async function deleteDesk(deskId) {
        // 
        try {
          const deleteDeskRequest = {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
          }

          await fetch(`http://localhost:8080/desks/${parseInt(deskId, 10)}`, deleteDeskRequest)
        }
        catch (error) {
          // Handle the error
          console.error(error);
        }
      }
      deleteDesk(selected.id);
      window.location.reload();
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
            allDesks.map((item) => (
              <div
                className={`small-desk2
                ${selected.id === item.id ? "selectedDesk" : ""}
                ${item.status === "TAKEN" ? "orange-body" : ""}
                ${item.status === "RESERVED" ? "red-body" : ""}
                ${item.status === "CLEAN_UP" ? "green-body" : ""}
                `}
                onClick={() => handleOnSelect(item)}
                id="small desk"
                key={item.id}
              >
                <div
                  className={`name-text 
                  ${item.status === "TAKEN" ? "orange-title" : ""}
                  ${item.status === "RESERVED" ? "red-title" : ""}
                  ${item.status === "CLEAN_UP" ? "green-title" : ""}
                  `}
                  id="small desk title"
                >
                  <b className="desk-title-text">Desk</b>
                </div>
                <div className="desk-data" id="small desk data">
                  <b className="desk-number">{item.number}</b>
                  <div className="status " id="status_label">
                    <p className="empty font-size-14" id="status">
                      {item.places} places
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
            <AddPopUp title={"Add a new Desk"} input={"Place Number"} actionBtn={"Add"} showPopup={isAddPopUpOpen} onClose={handleOnAdd} />
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
          <ViewDesk deskData={deskData} showPopup={isViewDeskOpen} onClose={handleOnViewDesk} />
        </div>
      </div>
    </Modal>
  );
};

export default DeskMenu;
