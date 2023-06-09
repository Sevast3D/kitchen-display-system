import "./Confimation.css";
const Confimation = ({ onClose }) => {
  return (
    <div className="confimation">
      <p className="removing-tables-order" id="font-size-16">
        Removing Table’s Order List
      </p>
      <div className="cleaning-msg1" id="cleaning_msg">
        <div className="are-you-sure">
          Are you sure that you want to remove the products from the desk?
        </div>
      </div>
      <div className="btns1" id="btns_container">
        <button className="cleaning-close-btn1" onClick={onClose}>
          <div className="close1">Close</div>
        </button>
        <button className="cleaning-yes-btn1">
          <b className="yes">Yes</b>
        </button>
      </div>
    </div>
  );
};

export default Confimation;
