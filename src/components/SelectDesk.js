import "./SelectDesk.css";
const SelectDesk = ({ onClose }) => {
  return (
    <div className="select-desk">
      <p className="select-desk1" id="font-size-16">
        Select Desk
      </p>
      <div className="desk-list" id="select desk list">
        <div className="desk" id="small desk">
          <div className="desk-title" id="small desk title">
            <b className="desk-title-text">Desk</b>
          </div>
          <div className="desk-data" id="small desk data">
            <b className="desk-number">6</b>
            <div className="desk-places">2 places</div>
          </div>
        </div>
      </div>
      <div className="btns" id="btns_container">
        <button className="close" onClick={onClose}>
          <div className="close1">Close</div>
        </button>
        <button className="choose">
          <b className="choose1">Choose</b>
        </button>
      </div>
    </div>
  );
};

export default SelectDesk;
