import "./DeleteReservation.css";
const DeleteReservation = ({ onClose }) => {
  return (
    <div className="delete-reservation">
      <p className="delete-reservation1" id="font-size-16">
        Delete Reservation
      </p>
      <div className="cleaning-msg1" id="cleaning_msg">
        <div className="id">ID</div>
      </div>
      <div className="btns" id="btns_container">
        <button className="cleaning-close-btn" onClick={onClose}>
          <div className="close1">Close</div>
        </button>
        <button className="cleaning-yes-btn">
          <b className="delete">Delete</b>
        </button>
      </div>
    </div>
  );
};

export default DeleteReservation;
