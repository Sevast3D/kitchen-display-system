import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./ProductView.css";
const ProductView = ({ onClose }) => {
  return (
    <div className="product-view">
      <img
        className="product-image-icon"
        alt=""
        id="product_image"
        src="/product-image@2x.png"
      />
      <Form.Group className="textareastandard-formgroup">
        <Form.Control as="textarea" placeholder="Textarea placeholder" />
      </Form.Group>
      <div className="product-main" id="product_data_container">
        <p className="burger-vita" id="product_name">
          Burger Vita
        </p>
        <p className="lei" id="price">
          17.95 Lei
        </p>
        <div className="quantity" id="amount_contrainer">
          <button className="minus" id="minus">
            <img className="vector-icon" alt="" src="/vector.svg" />
          </button>
          <p className="burger-vita" id="count_number">
            1
          </p>
          <button className="minus" id="plus">
            <img className="vector-icon1" alt="" src="/vector1.svg" />
            <img className="vector-icon" alt="" src="/vector.svg" />
          </button>
        </div>
      </div>
      <div className="buttons" id="btn_contrainer">
        <button className="delete-btn" id="delete_btn" onClick={onClose}>
          <img className="vector-icon3" alt="" src="/vector2.svg" />
        </button>
        <button className="add-btn" id="add_btn" onClick={onClose}>
          <b className="add">{`Add `}</b>
        </button>
      </div>
    </div>
  );
};

export default ProductView;
