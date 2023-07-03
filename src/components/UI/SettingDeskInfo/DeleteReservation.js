import { React, useState, useRef } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import "./DeleteReservation.css";
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

const DeleteReservation = ({ title, actionBtn, showPopup, onClose }) => {
  const inputDataRef = useRef();
  const [error, setError] = useState("");
  const [placeholderText, setPlaceHolderText] = useState("");

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
<<<<<<< Updated upstream
    const inputData = inputDataRef.current.value;
    console.log(inputData)
    onClose();
=======
    try {
      const getAllDesks = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      }

      const inputData = parseInt(inputDataRef.current.value, 10);
      fetch(`http://localhost:8080/desks?places=${parseInt(inputData, 10)}`, getAllDesks)

    }
    catch (error) {
      // Handle the error
      console.error(error);
    }
    window.location.reload();
>>>>>>> Stashed changes
  }
  const handleRemoveRez = () => {
<<<<<<< Updated upstream
    const inputData = inputDataRef.current.value;
    console.log("Removing" + inputData);
=======
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
>>>>>>> Stashed changes
    if (inputData != "") {
      window.location.reload();
    } else {
      setError("Invalid ID!");
    }
  }

  const resetPassword = () => {
    const auth = getAuth();
    const emailAddress = inputDataRef.current.value;
    console.log(emailAddress)
    sendPasswordResetEmail(auth, emailAddress)
      .then(() => {
        // Password reset email sent successfully
        const updateUser = {
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            profileImage: profileImage,
            role: profileData.role
          }),
        }
        
        fetch(`http://localhost:8080/users/${profileData.userId}`, updateUser)
        .then(res => {
          if (res.ok) {
            const user = sessionStorage.getItem('userUID');
            // Update logged user values
            // console.log("ProfileImage END: " + profileImage)
            // console.log("Image END: " + imageURL)
            writeUserData(user, profileData.userId, firstName, lastName, email, phoneNumber, profileImage, profileData.role);
            changePassword(password);
            handleSave();
            return null;
          } else {
            setError('Update user Data Failed on Backend!');
          }
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
        onClose()
      })
      .catch((error) => {
        // Error occurred while sending the password reset email
        console.error('Error sending password reset email:', error);
        setError("Error: " + error.code)
      });

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
        <div className="event-row error">
          {error}
        </div>
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
