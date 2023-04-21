import "./Desk.css";
const Desk = () => {
  return (
    <div className="desk" id="desk">
      <div className="button" id="button_container">
        <div className="status-button" id="buttons_container2">
          <button className="add">
            <img className="vector-icon" alt="" src="/eat.svg" />
            <div className="add1">Add</div>
          </button>
          <button className="pay">
            <img className="dollar-sign-icon" alt="" src="/dollarsign.svg" />
            <div className="add1">Pay</div>
          </button>
        </div>
      </div>
      <div className="middle-text" id="middle_text">
        <p className="p" id="desk_number">
          2
        </p>
        <div className="status" id="status_label">
          <div className="status1">Status:</div>
          <p className="empty" id="status">
            Empty
          </p>
        </div>
        <p className="pm" id="time">
          01:34:02 PM
        </p>
      </div>
      <div className="title" id="title">
        <p className="empty">Desk</p>
      </div>
    </div>
  );
};

export default Desk;
