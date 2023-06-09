import "./DeskInfo.css";
const DeskInfo = ({ onClose }) => {
  return (
    <div className="desk-info">
      <div className="close-btn" id="top-bar-container" onClick={onClose}>
        <p className="table-info" id="font-size-16">
          Table Info
        </p>
        <button className="x" id="close-btn" onClick={onClose}>
          <img className="vector-icon" alt="" src="/vector3.svg" />
          <img className="vector-icon" alt="" src="/vector4.svg" />
        </button>
      </div>
      <div className="desk-parent">
        <div className="desk" id="desk">
          <div className="middle-text" id="middle_text">
            <p className="p">2</p>
            <div className="status" id="status_label">
              <div className="amount-text-deskinfo">Status:</div>
              <b className="taken">Taken</b>
            </div>
            <p className="pm" id="time">
              01:34:02 PM
            </p>
          </div>
          <div className="title" id="title">
            <p className="table-info">Desk</p>
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
            <div className="product-info">
              <div className="amount-text-deskinfo">1 x</div>
              <div className="product-name-deskinfo">Menui Big Mac</div>
            </div>
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
        <button className="pay">
          <b className="remove-products">Remove Products</b>
        </button>
        <button className="pay">
          <b className="remove-products">Delete Reservation</b>
        </button>
      </div>
    </div>
  );
};

export default DeskInfo;
