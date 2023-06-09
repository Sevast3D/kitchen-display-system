import "./DeskMenu.css";
const DeskMenu = ({ onClose }) => {
  return (
    <div className="desk-menu">
      <div className="close-btn2" id="top-bar-container" onClick={onClose}>
        <p className="desk-menu-text" id="font-size-16">
          Desk Menu
        </p>
        <button className="x3" id="close-btn" onClick={onClose}>
          <img className="vector-icon7" alt="" src="/vector3.svg" />
          <img className="vector-icon7" alt="" src="/vector4.svg" />
        </button>
      </div>
      <div className="desk-menu-container" id="desk-menu-container">
        <div className="desk2">
          <div className="name-text">
            <b className="desk-name">Desk</b>
          </div>
          <div className="desk-number">
            <b className="dest-number-text">2</b>
            <div className="dest-number-text1">2 places</div>
          </div>
        </div>
      </div>
      <div className="desk-menu-btns-container">
        <div className="add-del-btns">
          <button className="add-table-deskmenu">
            <div className="add2">Add</div>
          </button>
          <button className="remove-tabledeskmenu">
            <img
              className="delete-undefined1"
              alt=""
              src="/delete--undefined.svg"
            />
          </button>
        </div>
        <button className="view-desk-btn">
          <b className="view-desk">View Desk</b>
        </button>
      </div>
    </div>
  );
};

export default DeskMenu;
