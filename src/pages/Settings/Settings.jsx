import { React, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import "./Settings.css"

import DeskMenu from "../../components/UI/SettingDeskInfo/DeskMenu"
import AddProduct from '../../components/UI/AddProduct/ProductsMenu';
import Profile from '../../components/UI/LoggedProfile/Profile'

import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import iconSettings from './assets/iconSetting.png'

function Settings({ onToggleSidebar }) {
  const history = useHistory();

  const [isDeskMenuOpen, setDeskMenuOpen] = useState(false);
  const [isProductMenuPopup, setProductMenuPopup] = useState(false);
  const [allDesks, setAllDesks] = useState([]);
  const [totalPayment, setTotalPayment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllDesks = {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        const response = await fetch(`http://localhost:8080/desks`, getAllDesks)
        if (!response.ok) {
          throw new Error('Failed to get desks data.');
        }
        const data = await response.json();

        function formattedData(desk) {
          return {
            id: desk.id,
            number: desk.number,
            status: desk.status,
            places: desk.places,
            cookingStatus: desk.cookingStatus,
            orderItems: desk.orderItems
          }
        }
        const allDesks = data.map(formattedData)
        setAllDesks(allDesks)
        // console.log(allDesks)
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    fetchData();
    // Get all profit data
    const getProfit = async () => {
      try {
        const getAllDesks = {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        const response = await fetch(`http://localhost:8080/payments`, getAllDesks)
        if (!response.ok) {
          throw new Error('Failed to get payments data.');
        }
        const data = await response.json();

        function formattedData(desk) {
          return {
            id: desk.id,
            date: desk.date,
            amount: desk.amount,
            deskId: desk.deskId
          }
        }

        const deskPayment = data
          .filter(desk => {
            const deskDate = new Date(desk.date);
            const currentDate = new Date();
            return deskDate.getMonth() === currentDate.getMonth() && deskDate.getFullYear() === currentDate.getFullYear();
          })
          .map(formattedData);

        const totalSum = deskPayment.reduce((sum, desk) => sum + desk.amount, 0);
        setTotalPayment(totalSum.toFixed(0));
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    getProfit();
  }, [])

  const handleOpenDeskMenu = () => {
    setDeskMenuOpen(!isDeskMenuOpen);
  }
  const handleProductsMenu = () => {
    setProductMenuPopup(!isProductMenuPopup);
  }

  const handleOpenPaymentPage = () => {
    history.push('/payment-history')
  }

  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>
      <div className='container-settings'>
        <div className="font-size-42 bold title-settings">
          <img src={iconSettings} className='icon' alt=''></img>Settings
        </div>
        <div className='container-menu'>
          <h3 className='font-size-20 gray-color'>Desks & Products</h3>
          <div className='gray-line'></div>
          <div className='title-settings'>
            <div className='font-size-32'> Currently desks: </div>
            <div className='font-size-32 bold'>{allDesks.length}</div>
          </div>
          <div>
            <div className='flex-start gap-18'>
              <div className='title-settings'>
                <div className='font-size-20 gray-color'> Empty </div>
                <div className='font-size-20 bold'>{allDesks.filter((desk) => desk.status === "EMPTY").length}</div>
              </div>
              <div className='title-settings'>
                <div className='font-size-20 gray-color'> Busy </div>
                <div className='font-size-20 bold'>{(allDesks.filter((desk) => desk.status === "TAKEN" || desk.status === "RESERVED").length)}</div>
              </div>
            </div>
          </div>
          <button className='action-btn' onClick={handleOpenDeskMenu}>
            <div className='font-size-16 bold text-white'>Desk Menu</div>
          </button>
          <DeskMenu allDesks={allDesks} showPopup={isDeskMenuOpen} onClose={handleOpenDeskMenu} />
          <button className='action-btn' onClick={handleProductsMenu}>
            <div className='font-size-16 bold text-white'>Product's Menu</div>
          </button>
          <AddProduct showPopup={isProductMenuPopup} onClose={handleProductsMenu} />
        </div>
        <div className='container-menu'>
          <h3 className='font-size-20 gray-color'>Payment History</h3>
          <div className='gray-line'></div>
          <div className='title-settings'>
            <div className='font-size-32'> Current Month Profit: </div>
            <div className='font-size-32 bold'>{totalPayment} LEI</div>
          </div>
          <button className='action-btn' onClick={handleOpenPaymentPage}>
            <div className='font-size-16 bold text-white'>Payment Page</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
