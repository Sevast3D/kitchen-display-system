import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./ProductView.css";
const ProductView1 = ({ onClose }) => {
  return (
    <div className="product-view1">
      <img
        className="product-image-icon"
        alt=""
        id="product_image"
        src="/product-image1@2x.png"
      />
      <Form.Group className="textareastandard-formgroup">
        <Form.Control as="textarea" placeholder="Textarea placeholder" />
      </Form.Group>
      <div className="product-main" id="product_data_container">
        <p className="burger-vita" id="product_name">
          Burger Vita
        </p>
        <p className="lei3" id="price">
          17.95 Lei
        </p>
        <div className="quantity2" id="amount_contrainer">
          <button className="minus" id="minus">
            <img className="vector-icon12" alt="" src="/vector1.svg" />
          </button>
          <p className="burger-vita" id="count_number">
            1
          </p>
          <button className="minus" id="plus">
            <img className="vector-icon13" alt="" src="/vector11.svg" />
            <img className="vector-icon12" alt="" src="/vector1.svg" />
          </button>
        </div>
      </div>
      <div className="buttons1" id="btn_contrainer">
        <button className="delete-btn" id="delete_btn" onClick={onClose}>
          <img className="vector-icon15" alt="" src="/vector2.svg" />
        </button>
        <button className="add-btn" id="add_btn" onClick={onClose}>
          <b className="add5">{`Add `}</b>
        </button>
      </div>
    </div>
  );
};

export default ProductView1;
