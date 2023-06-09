import "./OrderDetails.css";
const OrderDetails = ({ onClose }) => {
  return (
    <div className="order-details">
      <p className="order-list1" id="font-size-16">
        Order List
      </p>
      <div className="appetizers" id="category_label">
        <p className="appetizers1" id="category_name">
          Appetizers
        </p>
      </div>
      <div className="products" id="product">
        <div className="name" id="product_top_container">
          <div className="product-name" id="product_name_container">
            <p className="x5" id="product_count">
              2 x
            </p>
            <p className="product-name1" id="product_name">
              Meatballs
            </p>
          </div>
          <button className="x6" id="delete_btn">
            <img className="vector-icon16" alt="" src="/vector3.svg" />
            <img className="vector-icon16" alt="" src="/vector4.svg" />
          </button>
        </div>
        <div className="specification" id="product_specification">
          <p className="rare-spicy-chimichurri" id="product_components">
            - Rare, Spicy Chimichurri Potatoes
          </p>
          <p className="no-parmesan" id="product_specification">
            - No Parmesan
          </p>
        </div>
      </div>
      <div className="close-wrapper" onClick={onClose}>
        <div className="close12">Close</div>
      </div>
    </div>
  );
};

export default OrderDetails;
