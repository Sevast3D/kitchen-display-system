import { React, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, writeUserData, uploadImage, getImageURL } from "../firebase";


import './LoginWidget.css'

import logo from '../assets/Logo.png'
import noPorfilePic from './UI/LoggedProfile/assets/user-no-image.png'

const LoginWidget = () => {

  const passwordRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();

  const history = useHistory();
  const [error, setError] = useState("");

  // Profile image 
  const [imageURL, setImageURL] = useState(null);

  const [role, setRole] = useState("WAITER")
  const [userData, setUserData] = useState(null);

  const handleRegister = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const register = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'Bearer-Token': 'token-value'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      }),
    }
    if (phoneNumber.length > 8) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userUID = userCredential.user.uid;
          sessionStorage.setItem('userUID', userUID);
          // console.log(userCredential)
          // history.push("/")

          // Upload Image to Storage
          uploadImage(userUID, noPorfilePic)
            .then((imageURL) => {
              setImageURL(imageURL);
              // console.log(imageURL)
            })
            .catch((error) => {
              console.log(error);
            });

          fetch('http://localhost:8080/users/registration', register)
            .then(res => {
              if (res.ok) {
                setError("");
                return res.json();
              } else {
                setError("Registration Error!");
              }
            })
            .then(async (data) => {
              sessionStorage.setItem('token', data.accessToken);
              const mappedData = {
                userId: data.userId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                profileImage: imageURL,
                role: data.role
              };
              setUserData(mappedData);
              return mappedData;
            })
            .then((async (mappedData) => {
              const user = sessionStorage.getItem('userUID');

              const imagePath = 'user-no-image.png';
              const imageURL = await getImageURL(imagePath);
              setImageURL(imageURL);
              mappedData.profileImage = imageURL;

              const { userId, firstName, lastName, email, phoneNumber, profileImage, role } = mappedData;
              await Promise.resolve(writeUserData(user, userId, firstName, lastName, email, phoneNumber, profileImage, role));
              await Promise.resolve(waiter());
            }))
            .catch(error => {
              // Handle the error
              console.error(error);
            });

        }).catch((error) => {
          // Erorr Firebase
          setError(error.code);
        })

    }
  }

  const waiter = () => {
    history.push('/w',);
  };

  return (
    <div className='loginFrame'>
      <div className='logoText frame-column-center'>
        <img className='logo' src={logo} />
        <p className='bold font-size-36'>Create an account</p>
      </div>
      {/* Inputs for names, phone, email and pass */}
      <div className='fieldsFrame text-gray font-size-16 gap-10'>
        {/* Name Imput 2 in one Row */}
        <div className='double'>
          <div className='framesmall'>
            <p >First Name</p>
            <input id='first-name-input' className='input-gray font-size-16' ref={firstNameRef}></input>
          </div>
          <div className='framesmall'>
            <p >Last Name</p>
            <input id='last-name-input' className='input-gray font-size-16' ref={lastNameRef}></input>
          </div>
        </div>
        <div className='frame'>
          <p >Phone Number</p>
          <input id='phone-input' className='input-gray font-size-16' type='number' ref={phoneNumberRef}></input>
        </div>
        <div className='frame'>
          <p >Email</p>
          <input className='input-gray font-size-16' ref={emailRef}></input>
        </div>
        <div className='frame'>
          <p>Password</p>
          <input className='input-gray font-size-16' type='password' ref={passwordRef}></input>
        </div>
      </div>
      {/* Error Line with Login & Forgot Btn */}
      <div className='frame-column-center btnFrame gap-10 font-size-16'>
        <p id='error-msg' className='text-red'>{error}</p>
        <button className='btn-orange font-size-16 bold' onClick={handleRegister}>Register</button>
        <a href='/' className='text-gray'>Back</a>
      </div>
    </div>
  )
}

export default LoginWidget
