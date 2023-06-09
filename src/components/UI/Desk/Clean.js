import "./Clean.css";
const Clean = ({ onClose }) => {
  return (
    <div className="clean">
      <p className="cleaning" id="font-size-16">
        Cleaning
      </p>
      <div className="cleaning-msg3" id="cleaning_msg">
        <div className="are-you-sure1">
          Are you sure that you want to mark the desk as clean?
        </div>
      </div>
      <div className="btns4" id="btns_container">
        <button className="cleaning-close-btn2" onClick={onClose}>
          <div className="close9">Close</div>
        </button>
        <button className="cleaning-yes-btn2">
          <b className="yes1">Yes</b>
        </button>
      </div>
    </div>
  );
};

export default Clean;
