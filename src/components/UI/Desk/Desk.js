import "./Desk.css";
const Desk = () => {
  return (
    <div className="desk4" id="desk">
      <div className="button" id="button_container">
        <div className="status-button" id="buttons_container2">
          <button className="add6">
            <img className="vector-icon22" alt="" src="/eat1.svg" />
            <div className="add7">Add</div>
          </button>
          <button className="pay5">
            <img className="dollar-sign-icon" alt="" src="/dollarsign.svg" />
            <div className="add7">Pay</div>
          </button>
        </div>
      </div>
      <div className="middle-text1" id="middle_text">
        <p className="p4" id="desk_number">
          2
        </p>
        <div className="status2" id="status_label">
          <div className="status3">Status:</div>
          <p className="empty" id="status">
            Empty
          </p>
        </div>
        <p className="pm1" id="time">
          01:34:02 PM
        </p>
      </div>
      <div className="title2" id="title">
        <p className="empty">Desk</p>
      </div>
    </div>
  );
};

export default Desk;
