import { useState, useCallback } from "react";
import { Input } from "@chakra-ui/react";
import SelectDesk from "./SelectDesk";
import PortalPopup from "../Order/PortalPopup";
import "./AddReservation.css";
const AddReservation = ({ onClose }) => {
  const [isSelectDeskPopupOpen, setSelectDeskPopupOpen] = useState(false);

  const openSelectDeskPopup = useCallback(() => {
    setSelectDeskPopupOpen(true);
  }, []);

  const closeSelectDeskPopup = useCallback(() => {
    setSelectDeskPopupOpen(false);
  }, []);

  return (
    <>
      <div className="add-reservation">
        <div className="title1" id="title">
          <img className="vector-icon9" alt="" src="/fork_icon.svg" />
          <div className="add-reservation1">Add Reservation</div>
        </div>
        <div className="event-row" id="event_row">
          <p className="event-description">Event Description</p>
          <input
            className="event"
            type="text"
            placeholder="Description"
            required
            id="description"
          />
        </div>
        <div className="event-row" id="date_row">
          <div className="date-time">Date/ Time</div>
          <Input
            className="dt-pickerfilled"
            variant="filled"
            textColor="#fff"
            backgroundColor="#bebebe"
            borderColor="#bebebe"
            focusBorderColor="#93d36c"
            type="dateTime-local"
          />
        </div>
        <div className="table-row" id="table_row">
          <div className="table-column" id="desk number">
            <div className="date-time">Desk Number</div>
            <div className="desk-row" id="desk elements container">
              <div className="quantity" id="desk number">
                <div className="add-reservation1">3</div>
              </div>
              <button className="select-btn" onClick={openSelectDeskPopup}>
                <div className="select">Select</div>
              </button>
            </div>
          </div>
          <div className="people-column" id="people">
            <div className="date-time">Number of people</div>
            <div className="table-row" id="people counter">
              <button className="plus-container">
                <img
                  className="add-undefined-glyph-undef"
                  alt=""
                  src="/add--undefined--glyph-undefined.svg"
                />
              </button>
              <input className="quantity1" type="text" placeholder="33" />
              <button className="minus-container">
                <img
                  className="divider-short-undefined-gl"
                  alt=""
                  src="/divider-short--undefined--glyph-undefined.svg"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="buttons" id="btn_row">
          <button className="add3" id="AddBtn">
            <div className="add4">Add</div>
          </button>
          <button className="close5" id="close_btn">
            <div className="close6">Close</div>
          </button>
        </div>
      </div>
      {isSelectDeskPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSelectDeskPopup}
        >
          <SelectDesk onClose={closeSelectDeskPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default AddReservation;
