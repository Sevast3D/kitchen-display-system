import { useState, useRef, useCallback, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Modal } from "react-bootstrap";

import "./AddReservation.css";

import SelectDesk from "./SelectDesk";
import Fork from "./assets/fork.png"

const AddReservation = ({ showPopup, onClose }) => {
  const [isSelectDeskPopupOpen, setSelectDeskPopupOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedDesk, setSelectedDesk] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [allDesks, setAllDesks] = useState([])
  const descriptionRef = useRef();
  const [error, setError] = useState("");


  const handleUpdateSelectedDesk = (deskData) => {
    setSelectedDesk(deskData);
    console.log(deskData)



    setTimeout(() => {
      document.getElementById('desk-number-error').classList.remove('input-error');
      setError('')
    }, 300);
  };

  useEffect(() => {

  }, [selectedDesk])

  const handleInputChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleDataChange = (event) => {
    setSelectedDate(event.target.value);

    setTimeout(() => {
      document.getElementById('dt-picker').classList.remove('input-error');
      setError('')
    }, 300);
  }

  const handleOpenSelectDeskPopup = () => {

    if (selectedDate) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };

      const formattedDate = selectedDate.toLocaleString('en-US', options).replace('T', ' ');
      setSelectedDate(formattedDate)
      const fetchData = async () => {
        try {
          const getAllDesks = {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
              people: quantity,
              dateTime: formattedDate,
            }),
          }

          const response = await fetch(`http://localhost:8080/reservations/desks`, getAllDesks)
          if (!response.ok) {
            throw new Error('Failed to get desks data.');
          }
          const data = await response.json();

          function formattedData(desk) {
            return {
              id: desk.id,
              number: desk.number,
              status: desk.status,
              places: desk.places,
              cookingStatus: desk.cookingStatus,
              orderItems: desk.orderItems,
              reservations: desk.reservations
            }
          }
          const allDesks = data.map(formattedData)
          setAllDesks(allDesks)

          setSelectDeskPopupOpen(!isSelectDeskPopupOpen);
        }
        catch (error) {
          // Handle the error
          console.error(error);
        }
      }
      fetchData();
    } else {
      document.getElementById('dt-picker').classList.add('input-error');
      setError("Select the Date/ Time firstly")
    }
  };

  const onInceaseQuantity = (() => {
    setQuantity(quantity + 1);
  })

  const onDecreseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  const handleAddReservation = () => {
    const description = descriptionRef.current.value;

    if ((selectedDate.length !== 0) && (selectedDesk.number.length != 0)) {
      const fetchData = async () => {
        try {
          const addReservation = {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
              eventDescription: description,
              people: quantity,
              dateTime: selectedDate,
              deskId: selectedDesk.id,
            }),
          }

          const response = await fetch(`http://localhost:8080/reservations`, addReservation)
          if (!response.ok) {
            throw new Error('Failed to add reservation.');
          }

          console.log([description, selectedDate, selectedDesk])
          onClose();
        }
        catch (error) {
          // Handle the error
          console.error(error);
        }
      }
      fetchData();
    } else {
      if (!selectedDate) {
        document.getElementById('dt-picker').classList.add('input-error');
        setError("Set the Date/ Time")
      }

      if (selectedDesk.length === 0) {
        document.getElementById('desk-number-error').classList.add('input-error');
      }
    }
  }

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity])

  // When the modal is closing to reset the values.
  useEffect(() => {
    setSelectedDesk([]);
    setSelectedDate('')
    setQuantity(1)
    setError('')
  }, [showPopup]);


  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered>
      <div className="add-reservation">
        <div className="reservation-title" id="title">
          <img className="fork-icon" alt="" src={Fork} />
          <div className="div text-white">Add Reservation</div>
        </div>
        <div className="event-row" id="event_row">
          <p className="event-description">Event Description</p>
          <input
            className="event"
            type="text"
            placeholder="Description"
            required
            ref={descriptionRef}
            id="description" />
        </div>
        <div className="event-row" id="date_row">
          <div className="date-time">Date/ Time</div>
          <Input
            id="dt-picker"
            className="dt-pickerfilled"
            variant="filled"
            textColor="#fff"
            backgroundColor="#bebebe"
            borderColor="#bebebe"
            focusBorderColor="#93d36c"
            type="dateTime-local"
            required
            onChange={handleDataChange}
          />
        </div>
        <div className="table-row" id="table_row">
          <div className="table-column" id="desk number">
            <div className="date-time">Desk Number</div>
            <div className="desk-row" id="desk elements container">
              <div className="selected-desk-number-label" id="desk-number-error">
                <div className="div">{selectedDesk.number}</div>
              </div>
              <button className="select-btn" onClick={handleOpenSelectDeskPopup}>
                <div className="select">Select</div>
              </button>
              <SelectDesk allDesks={allDesks} showPopup={isSelectDeskPopupOpen} onClose={handleOpenSelectDeskPopup} updateSelectedDesk={handleUpdateSelectedDesk} />
            </div>
          </div>
          <div className="people-column" id="people">
            <div className="date-time">Number of people</div>
            <div className="table-row" id="people counter">
              <button className="plus-container" onClick={() => onInceaseQuantity()}>
                <img
                  className="add-undefined-glyph-undef"
                  alt=""
                  src="/add--undefined--glyph-undefined.svg" />
              </button>
              <input className="quantity1" type="number" value={quantity} onChange={handleInputChange} />
              <button className="minus-container" onClick={() => { onDecreseQuantity() }}>
                <img
                  className="divider-short-undefined-gl"
                  alt=""
                  src="/divider-short--undefined--glyph-undefined.svg" />
              </button>
            </div>
          </div>
        </div>
        <div className="event-row error">
          {error}
        </div>
        <div className="buttons-reservation" id="btn_row">
          <button className="add" id="AddBtn" onClick={handleAddReservation}>
            <div className="add1">Add</div>
          </button>
          <button className="close2" id="close_btn" onClick={onClose}>
            <div className="close3">Close</div>
          </button>
        </div>
      </div>
    </Modal >
  );
};

export default AddReservation;
