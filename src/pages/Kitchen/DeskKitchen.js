import { useState, useEffect } from "react";
import "./DeskKitchen.css";

import cookingIcon from './assets/button-icon-kitchen.svg';
import xIcon from './assets/x-kitchen.svg';
import doneIcon from './assets/done.png';

const DeskKitchen = ({ deskData }) => {
  const [timeDifference, setTimeDifference] = useState();
  const [productList, setProductList] = useState([]);
  const sortedProductList = productList.sort((a, b) => a.product.category.localeCompare(b.product.category));
  const [refresh, setRefresh] = useState(false)
  const [startTimeString, setStartTimeString] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getDeskData = {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
        const response = await fetch(`http://localhost:8080/desks/${deskData.id}`, getDeskData)
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to get desks data.');
        }

        console.log(data)
        const mappedData = {
          id: data.id,
          number: data.number,
          status: data.status,
          places: data.places,
          cookingStatus: data.cookingStatus,
          orderItems: data.orderItems,
          cookingTime: data.cookingTime
        }
        setProductList(mappedData.orderItems);
        setStartTimeString(mappedData.cookingTime)

      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
    // console.log(productList)
  }, [refresh])

  useEffect(() => {
    // console.log(deskData)
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

  }, [startTimeString]);


  const handleCookProduct = (order) => {
    async function updateDeskStatus() {
      // 
      try {
        const updateOrderStatus = {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        await fetch(`http://localhost:8080/orders/${parseInt(order.id, 10)}?status=${order.status === "COOKED" ? "NOT_COOKED" : "COOKED"}`, updateOrderStatus)
        if (productList.every(item => item.status === "COOKED")) {
          handleDoneOrder();
        }
        setRefresh(!refresh)
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    updateDeskStatus();
  }

  const handleStartCooking = () => {
    async function updateDeskStatus() {
      try {
        const updateOrderStatus = {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        await fetch(`http://localhost:8080/desks/${parseInt(deskData.id, 10)}?status=TAKEN&cookingStatus=STARTED`, updateOrderStatus)

        window.location.reload();
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    updateDeskStatus();
  };

  const handleDoneOrder = () => {
    async function updateDeskStatus() {
      // 
      try {
        const updateOrderStatus = {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        await fetch(`http://localhost:8080/desks/${parseInt(deskData.id, 10)}?status=TAKEN&cookingStatus=DONE`, updateOrderStatus)
        window.location.reload();
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    updateDeskStatus();
  }



  return (
    <div className="desk-kitchen">
      <div className={`desk-top-kitchen ${timeDifference > 45 ? "top-red" : (timeDifference > 15 ? "top-orange" : "")}`}>

        <b className="desk-text-kitchen">Desk</b>
      </div>
      <div className={`number-container-kitchen ${timeDifference > 45 ? "body-red" : (timeDifference > 15 ? "body-orange" : "")}`}>
        <b className="desk-text-kitchen1">{deskData.number}</b>
        <div className="hour-text-kitchen">{timeDifference} min</div>
      </div>
      {
        sortedProductList.map((product, index) => {
          const categoryChanged = index === 0 || product.product.category !== sortedProductList[index - 1].product.category;
          // const categoryChanged = index
          return (
            <div className="order-details-kitchen" key={index}>
              {
                categoryChanged && (
                  <div className="category-name-kitchen">
                    <div className="desk-text-kitchen">{product.product.category}</div>
                  </div>
                )
              }
              <div className={`product-kitchen ${product.status === "COOKED" ? 'line-through' : ''}`}>
                <div className="main-details-container-kitchen">
                  <div className="product-details-kitchen">
                    <div className="amount-kitchen">{product.amount + "x"}</div>
                    <div className="name-kitchen">{product.product.name}</div>
                  </div>
                  <button
                    className={`remove-product-kitchen btn-empty `}
                    onClick={() => handleCookProduct(product)}
                  >
                    <img className="x-kitchen-icon" alt="" src={xIcon} />
                  </button>
                </div>
                <div className="specification-kitchen">
                  <div className="description-text-kitchen">
                    - {product.product.components}
                  </div>
                  <b className="alergic-kitchen">- {product.specification === "" ? "None" : product.specification}</b>
                </div>
              </div>
            </div>
          )
        })
      }
      <div className="button-container-kitchen">
        {
          deskData.cookingStatus === "NOT_STARTED" ?
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
