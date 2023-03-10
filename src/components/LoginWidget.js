import React from 'react'
import { useHistory } from 'react-router-dom';

import './LoginWidget.css'

import logo from '../assets/Logo.png';

function LoginWidget() {
  const history = useHistory();
  
  const waiter = () => {
    history.push('/w',);
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
          <input className='input-gray font-size-16'></input>
        </div>
        <div className='frame'>
          <p>Password</p>
          <input className='input-gray font-size-16' type='password'></input>
        </div>
      </div>
      {/* Error Line with Login & Forgot Btn */}
      <div className='frame-column-center btnFrame gap-10 font-size-16'>
        <p id='error-msg' className='text-red'>Text!</p>
        <button className='btn-orange font-size-16 bold' onClick={waiter}>Login</button>
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

export default LoginWidget
