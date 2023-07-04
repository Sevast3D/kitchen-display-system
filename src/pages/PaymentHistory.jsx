import React from 'react'
import { useEffect, useRef, useState } from 'react'

import toggleIcon from '../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import Profile from '../components/UI/LoggedProfile/Profile'

function PaymentHistory({ onToggleSidebar }) {
  const [paymentData, setPaymentData] = useState([])
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [totalPayment, setTotalPayment] = useState(0);


  // Filter the orderList based on the search term
  const filteredList = paymentData.filter(item => {
    const deskId = item.deskId.toString().toLowerCase();
    const date = item.date.toString();
    return deskId.includes(searchTerm.toLowerCase()) && date.includes(searchDate.toLowerCase());
  });


  const handleSearchId = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearchDate = e => {
    setSearchDate(e.target.value);
  };


  useEffect(() => {
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
        const deskPayment = data.map(formattedData)
        setPaymentData(deskPayment)
      }
      catch (error) {
        // Handle the error
        console.error(error);
      }
    }
    getProfit();
  }, [])

  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
        <Profile />
      </div>
      <div className='form-group row mb-3'>
        <div className="col-sm-3">
          <input className="form-control" type="number" placeholder="Search By Desk Number" value={searchTerm} onChange={handleSearchId} />
        </div>
        <div className="col-sm-3">
          <input className="form-control" type="text" placeholder="Search By Date" value={searchDate} onChange={handleSearchDate} />
        </div>
      </div>
      <table id={tableRef} className="table table-bordered">
        <thead className='table-warning'>
          <tr>
            <th>Desk Number</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredList.map((item) => (
          <tr>
            <td>{item.deskId}</td>
            <td>{item.amount.toFixed(2)} LEI</td>
            <td>{item.date}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className='title-settings'>
            <div className='font-size-20'> Total after search: </div>
            <div className='font-size-20 bold'>{filteredList.reduce((sum, item) => sum + item.amount, 0).toFixed(2)} LEI</div>
          </div>
    </div>
  )
}

export default PaymentHistory
