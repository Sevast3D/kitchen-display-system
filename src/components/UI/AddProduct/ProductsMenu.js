import "./ProductsMenu.css";
const ProductsMenu = ({ onClose }) => {
  return (
    <div className="productsmenu">
      <div className="close-btn" id="top-bar-container" onClick={onClose}>
        <p className="products-menu" id="font-size-16">
          Product’s Menu
        </p>
        <button className="x1" id="close-btn" onClick={onClose}>
          <img className="vector-icon3" alt="" src="/vector3.svg" />
          <img className="vector-icon3" alt="" src="/vector4.svg" />
        </button>
      </div>
      <input className="cleaning-msg" type="text" placeholder="Search" />
      <button className="product-product-menu">
        <div className="product-name-productmenu">Meniu Big Mac</div>
        <div className="product-name-productmenu">17.86 Lei</div>
      </button>
      <div className="btns-productmenu">
        <div className="main-btns-productmenu">
          <button className="add-productmenu">
            <div className="add1">Add</div>
          </button>
          <button className="remove-productmenu">
            <img
              className="delete-undefined"
              alt=""
              src="/delete--undefined.svg"
            />
          </button>
        </div>
        <button className="viewproduct-productmenu">
          <b className="view-product">View Product</b>
        </button>
      </div>
    </div>
  );
};

export default ProductsMenu;
