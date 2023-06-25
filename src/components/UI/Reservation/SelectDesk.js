import { useState } from "react";
import "./SelectDesk.css";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";

// const DeskList = [[1, 2], [4, 2], [45, 4], [2, 8], [12, 2], [33, 4], [7, 2], [19, 5], [26, 3], [41, 2], [50, 1]]

const SelectDesk = ({allDesks, showPopup, onClose, updateSelectedDesk }) => {
  const [selected, setSelected] = useState([])
  const [desks, setAllDesks] = useState(allDesks)

  useEffect(()=>{

  },[])

  const handleOnSelect = (deskData) => {
    setSelected(deskData);
  }

  const handleOnChoose = () =>{
    
    updateSelectedDesk(selected)
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
            allDesks.map((item) => (
              <div
                className={`small-desk ${selected === item ? "green" : ""}`}
                onClick={() => handleOnSelect(item)}
                id="small desk"
                key={item.id}
              >
                <div
                  className={`small-desk-title ${selected === item ? "green" : ""}`}
                  id="small desk title"
                >
                  <b className="desk-title-text">Desk</b>
                </div>
                <div className="desk-data" id="small desk data">
                  <b className="desk-number">{item.number}</b>
                  <div className="desk-places">{item.places} places</div>
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
