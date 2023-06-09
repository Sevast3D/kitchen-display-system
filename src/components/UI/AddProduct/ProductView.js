import "./ProductView.css";
const ProductView = ({ onClose }) => {
  return (
    <div className="product-view">
      <img
        className="product-image-productview-icon"
        alt=""
        id="product_image"
        src="/product-image@2x.png"
      />
      <div className="product-main-productview" id="product_data_container">
        <p className="productname-productview" id="product_name">
          Burger Vita
        </p>
        <p className="price-productview" id="price">
          17.95 Lei
        </p>
      </div>
      <div className="categorycontainer-productview">
        <div className="categroytext-productview">Category</div>
        <div className="categroy-productview">
          <span>Appetizes</span>
          <span className="span">{` `}</span>
        </div>
      </div>
      <div className="description-productview">
        <div className="categroytext-productview">{`Description `}</div>
        <div className="description-productview1">{`2 Chifle, cascaval topit, sorie, sos de ustroi, ceapa `}</div>
      </div>
      <div className="btnscontainer-productview" id="btn_contrainer">
        <button
          className="removebtn-productview"
          id="delete_btn"
          onClick={onClose}
        >
          <img className="vector-icon" alt="" src="/vector.svg" />
        </button>
        <button className="closebtn-productview" id="add_btn" onClick={onClose}>
          <b className="close">Close</b>
        </button>
      </div>
    </div>
  );
};

export default ProductView;
