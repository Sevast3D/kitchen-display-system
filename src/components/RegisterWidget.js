import {React, useRef} from 'react'

import './LoginWidget.css'

import logo from '../assets/Logo.png'

const LoginWidget = () => {
  
  const passwordRef = useRef();
  const emailRef = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const phoneNumber = useRef();

  const handleRegister = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

  }

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
            <input id='first-name-input' className='input-gray font-size-16' ref={firstName}></input>
          </div>
          <div className='framesmall'>
            <p >Last Name</p>
            <input id='last-name-input' className='input-gray font-size-16' ref={lastName}></input>
          </div>
        </div>
        <div className='frame'>
          <p >Phone Number</p>
          <input id='phone-input' className='input-gray font-size-16' type='number' ref={phoneNumber}></input>
        </div>
        <div className='frame'>
          <p >Email</p>
          <input className='input-gray font-size-16' ref={emailRef}></input>
        </div>
        <div className='frame'>
          <p>Password</p>
          <input className='input-gray font-size-16' type='password'></input>
        </div>
      </div>
      {/* Error Line with Login & Forgot Btn */}
      <div className='frame-column-center btnFrame gap-10 font-size-16'>
        <p id='error-msg' className='text-red'>Error! Please try again.</p>
        <button className='btn-orange font-size-16 bold'>Register</button>
        <a href='/' className='text-gray'>Back</a>
      </div>
    </div>
  )
}

export default LoginWidget
