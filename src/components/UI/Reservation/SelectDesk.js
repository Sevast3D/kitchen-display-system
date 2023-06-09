import { useState } from "react";
import "./SelectDesk.css";
import { Modal } from "react-bootstrap";

const DeskList = [[1, 2], [4, 2], [45, 4], [2, 8], [12, 2], [33, 4], [7, 2], [19, 5], [26, 3], [41, 2], [50, 1]]

const SelectDesk = ({ showPopup, onClose, updateSelectedDesk }) => {
  const [selected, setSelected] = useState("none")

  const handleOnSelect = (index) => {
    setSelected(index);
  }

  const handleOnChoose = () =>{
    updateSelectedDesk(DeskList[selected])
    onClose();
  }

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="select-desk">
        <p className="select-desk1" id="font-size-16">
          Select Desk
        </p>
        <div className="desk-list" id="select desk list">
          {
            DeskList.map((item, index) => (
              <div
                className={`small-desk ${selected === index ? "green" : ""}`}
                onClick={() => handleOnSelect(index)}
                id="small desk"
                key={index}
              >
                <div
                  className={`small-desk-title ${selected === index ? "green" : ""}`}
                  id="small desk title"
                >
                  <b className="desk-title-text">Desk</b>
                </div>
                <div className="desk-data" id="small desk data">
                  <b className="desk-number">{item[0]}</b>
                  <div className="desk-places">{item[1]} places</div>
                </div>
              </div>
            ))}
        </div>
        <div className="btns" id="btns_container">
          <button className="choose" onClick={handleOnChoose}>
            <b className="choose1">Choose</b>
          </button>
          <button className="close" onClick={onClose}>
            <div className="close1">Close</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectDesk;
