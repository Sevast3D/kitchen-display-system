import { React, useState, useRef } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import "./DeleteReservation.css";
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

const DeleteReservation = ({ title, actionBtn, showPopup, onClose }) => {
  const inputDataRef = useRef();
  const newPassRef = useRef();

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("")
  const [placeholderText, setPlaceHolderText] = useState("");
  const [rightPass, setRightPass] = useState(false);
  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (actionBtn === "Add") {
      setPlaceHolderText("Enter Table Capacity");
    } else if (actionBtn === "Delete") {
      setPlaceHolderText("ID");
    } else {
      setPlaceHolderText("Email");
    }
  }, [placeholderText])

  const handleAddDesk = () => {
    try {
      const getAllDesks = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      }

      const inputData = inputDataRef.current.value;
      fetch(`http://localhost:8080/desks?places=${parseInt(inputData, 10)}`, getAllDesks)

    }
    catch (error) {
      // Handle the error
      console.error(error);
    }
    window.location.reload();
  }

  const handleRemoveRez = () => {
    const inputData = parseInt(inputDataRef.current.value, 10);

    async function deleteReservation() {
      // 
      try {
        const deleteReservation = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }

        await fetch(`http://localhost:8080/reservations/${parseInt(inputData, 10)}`, deleteReservation)

        window.location.reload();
      }
      catch (error) {
        // Handle the error
        setError("Invalid ID!");
        console.error(error);
      }
    }
    if (inputData != "") {
      deleteReservation();
      console.log("Removing " + inputData);
    } else {
      setError("Invalid ID!");
    }
  }

  const resetPassword = () => {
    if (!rightPass) {
      const auth = getAuth();
      const emailAddress = inputDataRef.current.value;
      console.log(emailAddress)

      // Get UserId for Firebase Listener
      const fetchData = async () => {
        try {
          const getUserId = {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
          // Get all members
          const response = await fetch(`http://localhost:8080/users/?email=${emailAddress}`, getUserId)
          if (!response.ok) {
            throw new Error('Failed to get user Id.');
          }
          const data = await response.text();

          if (data.length === 0) {
            setError("Invalid Email");
            setMsg("")
          } else {
            setError("")
            setMsg("Succes! Check your email and retype the new pass!")
            setRightPass(true)
            setUserId(data)


            sendPasswordResetEmail(auth, emailAddress)
              .catch((error) => {
                // Error occurred while sending the password reset email
                console.error('Error sending password reset email:', error);
                setError("Error: " + error.code)
              });
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    } else {
      updateUserData();
    }
  }

  // Password reset email on backend
  const updateUserData = () => {
    let password = newPassRef.current.value;
    const updateUser = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify({
        password: password
      }),
    }

    if(password.length > 0){
    fetch(`http://localhost:8080/users/${userId}`, updateUser)
      .then(res => {
        if (!res.ok) {
          setError('Update user password Failed on Backend!');
        }else{
          setMsg("")
          setError("")
          window.location.reload();
        }
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      }); 
    }else{
      setMsg("")
      setError("Please enter the new pass!")
    }
  }

  return (
    <Modal show={showPopup} onHide={onClose} animation={false} centered backdrop={false}>
      <div className="delete-reservation">
        <p className="delete-reservation1" id="font-size-16">
          {title}
        </p>
        <input
          className="cleaning-msg"
          type='text'
          placeholder={placeholderText}
          ref={inputDataRef}
          id="inputData"
        />
        {rightPass ? <>
          <input
            className="cleaning-msg"
            type='password'
            placeholder="Retype pass used on mail"
            ref={newPassRef}
            id="inputPass"
          /></>
          : ""
        }
        <div className="event-row error">
          {error}
        </div>
        <p className='text-success'>{msg}</p>
        <div className="btns" id="btns_container">
          <button className="cleaning-close-btn" onClick={onClose}>
            <div className="close text-black">Close</div>
          </button>
          <button className="cleaning-yes-btn" onClick={
            () => {
              if (actionBtn === "Add") {
                handleAddDesk();
              } else if (actionBtn === "Delete") {
                handleRemoveRez();
              } else if (actionBtn === "Send") {
                resetPassword();
              }
            }
          }>
            <b className="delete">{actionBtn}</b>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteReservation;
