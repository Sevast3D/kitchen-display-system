import "./DeskKitchen.css";
const DeskKitchen = () => {
  return (
    <div className="desk-kitchen">
      <div className="desk-top-kitchen">
        <b className="desk-text-kitchen">Desk</b>
      </div>
      <div className="number-container-kitchen">
        <b className="desk-text-kitchen1">2</b>
        <div className="hour-text-kitchen">01:34:02 PM</div>
      </div>
      <div className="order-details-kitchen">
        <div className="category-name-kitchen">
          <div className="desk-text-kitchen">Entrees</div>
        </div>
        <div className="product-kitchen">
          <div className="main-details-container-kitchen">
            <div className="product-details-kitchen">
              <div className="amount-kitchen">2 x</div>
              <div className="name-kitchen">Meatballs</div>
            </div>
            <div className="remove-product-kitchen">
              <img className="x-kitchen-icon" alt="" src="/x-kitchen.svg" />
            </div>
          </div>
          <div className="specification-kitchen">
            <div className="description-text-kitchen">
              - Rare, Spicy Chimichurri Potatoes
            </div>
            <b className="alergic-kitchen">- No Parmesan</b>
          </div>
        </div>
      </div>
      <div className="button-container-kitchen">
        <button className="button-kitchen">
          <img
            className="button-icon-kitchen"
            alt=""
            src="/button-icon-kitchen.svg"
          />
          <div className="button-text-kitchen">Start Cooking</div>
        </button>
      </div>
    </div>
  );
};

export default DeskKitchen;
