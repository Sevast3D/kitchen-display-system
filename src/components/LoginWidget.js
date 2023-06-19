import { React, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'

import './LoginWidget.css'

import logo from '../assets/Logo.png';
import Login from "../pages/Login/Login";
import { useAuth } from "../config/AuthContext";
import { auth, writeUserData } from "../firebase";

function LoginWidget() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("")

  const [userData, setUserData] = useState(null);

  // const { errorAuth, SignUp, currentUser} = useAuth();

  const waiter = () => {
    history.push('/w',);
  };

  const verifyValues = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const login = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'Bearer-Token': 'token-value'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        sessionStorage.setItem('userUID', user);
        // console.log(userCredential.user.email);
        // writeUserData(user, userCredential.user.userId, userCredential.user.firstName, userCredential.user.lastName, userCredential.user.email, userCredential.user.phoneNumber, userCredential.user.profileImage, userCredential.user.role);
        fetch('http://localhost:8080/users/login', login)
          .then(res => {
            if (res.ok) {
              setError("");

              return res.json();
            } else {
              setError("Error! Values do not match.");
              throw new Error('Login failed!');
            }
          })
          .then((data) => {
            sessionStorage.setItem('token', data.accessToken);
            const mappedData = {
              userId: data.userId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phoneNumber: data.phoneNumber,
              profileImage: data.profileImage,
              role: data.role
            };
            setUserData(mappedData);
            return mappedData
          })
          .then((mappedData) => {
            if (error === "") {
              const user = sessionStorage.getItem('userUID');
              const { userId, firstName, lastName, email, phoneNumber, profileImage, role } = mappedData;
              writeUserData(user, userId, firstName, lastName, email, phoneNumber, profileImage, role);
              waiter();
            }
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      })
      .catch((error) => {
        setError(error.code)
      })

  };
  return (
    <div className='loginFrame'>
      <div className='logoText frame-column-center'>
        <img className='logo' src={logo} />
        <p className='bold font-size-36'>Welcome back!</p>
      </div>
      {/* Inputs for email and pass */}
      <div className='fieldsFrame text-gray font-size-16 gap-10'>
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
        <button className='btn-orange font-size-16 bold' onClick={verifyValues}>Login</button>
        <a href='' className='text-black'>Forgot your password?</a>
      </div>
      {/* Move to Sign Up Section */}
      <div className='font-size-16'>
        <p className='text-gray'>You don’t have an account? <span></span>
          <a href='/register' className='text-orange'>Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginWidget;
