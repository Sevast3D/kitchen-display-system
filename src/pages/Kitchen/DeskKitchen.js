import { useState, useEffect } from "react";
import "./DeskKitchen.css";

import cookingIcon from './assets/button-icon-kitchen.svg';
import xIcon from './assets/x-kitchen.svg';
import doneIcon from './assets/done.png';

const DeskKitchen = ({ deskData }) => {
  const [timeDifference, setTimeDifference] = useState();
  const [productList, setProductList] = useState(deskData[2]);
  // [2, "01:23:23 PM", [[1, "Pizza", 29.99, "Salam, Ananas, Lipie, Sos"], 0, "Intolerant Lactoza", 2], 0],

  useEffect(() => {
    const startTimeString = new Date(deskData[1]);
    const startTime = new Date(startTimeString);

    // Update time difference every second
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      // console.log("Start time:" + startTime, "Current time:" + currentDate);
      const difference = currentDate - startTime;
      const differenceInMinutes = Math.floor(difference / (1000 * 60)); // Divide by milliseconds in a minute
      setTimeDifference(differenceInMinutes);
    }, 1000);

    // Clean up the interval when the component unmounts or deskData changes
    return () => {
      clearInterval(intervalId);
    };
    
  }, [deskData]);

  const getCategoryName = (categoryNumber) => {
    switch (categoryNumber) {
      case 0:
        return 'Appetizers';
      case 1:
        return 'Entrees';
      case 2:
        return 'Sides';
      case 3:
        return 'Desserts';
      case 4:
        return 'Beverages';
      // Add more cases for different category numbers
      default:
        return 'Unknown Category';
    }
  };

  const handleCookProduct = (productName) => {
    console.log('Make roduct status Cooked:', productName);

    const updatedProductList = productList.map((product) => {
      if (product[0][1] === productName) {
        // Toggle the cooked status by negating the current value
        product[1] = !product[1];
      }
      return product;
    });

    setProductList(updatedProductList);
  }

  const handleStartCooking = () => {
    console.log("COOKING")
    window.location.reload();
  };

  const handleDoneOrder = () => {
    window.location.reload();
  }

  return (
    <div className="desk-kitchen">
      <div className={`desk-top-kitchen ${timeDifference > 45 ? "top-red" : (timeDifference > 15 ? "top-orange" : "")}`}>

        <b className="desk-text-kitchen">Desk</b>
      </div>
      <div className={`number-container-kitchen ${timeDifference > 45 ? "body-red" : (timeDifference > 15 ? "body-orange" : "")}`}>
        <b className="desk-text-kitchen1">{deskData[0]}</b>
        <div className="hour-text-kitchen">{timeDifference} min</div>
      </div>
      {
        productList.map((product, index) => {
          const categoryChanged = index === 0 || product[0][0] !== productList[index - 1][0][0];
          return (
            <div className="order-details-kitchen" key={index}>
              {
                categoryChanged && (
                  <div className="category-name-kitchen">
                    <div className="desk-text-kitchen">{getCategoryName(product[0][0])}</div>
                  </div>
                )
              }
              <div className={`product-kitchen ${product[1] ? 'line-through' : ''}`}>
                <div className="main-details-container-kitchen">
                  <div className="product-details-kitchen">
                    <div className="amount-kitchen">{product[3]} x</div>
                    <div className="name-kitchen">{product[0][1]}</div>
                  </div>
                  <button
                    className={`remove-product-kitchen btn-empty `}
                    onClick={() => handleCookProduct(product[0][1])}
                  >
                    <img className="x-kitchen-icon" alt="" src={xIcon} />
                  </button>
                </div>
                <div className="specification-kitchen">
                  <div className="description-text-kitchen">
                    - {product[0][3]}
                  </div>
                  <b className="alergic-kitchen">- {product[2] === "" ? "None" : product[2]}</b>
                </div>
              </div>
            </div>
          )
        })
      }
      <div className="button-container-kitchen">
        {
          deskData[3] === 0 ?
            <button className="button-kitchen" onClick={handleStartCooking}>
              <img className="button-icon-kitchen" alt="" src={cookingIcon} />
              <div className="button-text-kitchen">Start Cooking</div>
            </button> :
            <button className="button-kitchen-done" onClick={handleDoneOrder}>
              <img className="button-icon-kitchen" alt="" src={doneIcon} />
              <div className="button-text-kitchen">Done</div>
            </button>
        }
      </div>
    </div >
  );
};

export default DeskKitchen;
