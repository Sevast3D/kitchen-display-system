import { React, useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';

import './LoginWidget.css'

import logo from '../assets/Logo.png';

function LoginWidget() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("")

  const [data, setData] = useState(null);
  const [val, setVal] = useState('');
  const [fetchData, setFetch] = useState(false);


  useEffect(() => {
    if (fetchData) {

    }

  }, [fetchData]);


  const waiter = () => {
    history.push('/w',);
  };

  const verifyValues = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      firstName: "Logan",
      lastName: "Wolverin",
      email: "logan@gmail.com",
      phoneNumber: "+340604023",
      password: "123456"
    }
    // const payload = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json, text/plain',
    //     'Content-Type': 'application/json;charset=UTF-8'
    //   },
    //   body: JSON.stringify({ firstName: "Logan",
    //   lastName: "Wolverin",
    //   email: "logan@gmail.com",
    //   phoneNumber: "+340604023",
    //   password: "123456" }),
    // }
    // fetch('http://localhost:8080/users/registration', payload)
    //   .then((res) => console.log(res.json()))
    //   .then((data) => setData(data.id));
    
    console.log(email);
    console.log(password);
    
      const login = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
          'Bearer-Token': 'token-value'
        },
        body: JSON.stringify({
        email: email,
        password: password }),
      }
      fetch('http://localhost:8080/users/login', login)
        .then((res) => console.log(res.json()))
        .then((data) => setData(data.id));


    if (email === "test" && password === "123") {
      setError("Values match!");
      // waiter();
    } else {
      setError("Error! Values do not match.");
    }
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
