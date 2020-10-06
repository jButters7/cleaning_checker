import React, { useState } from 'react';
import axios from 'axios';
import './register.css'

function Register(props) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [apartment_num, setApartNum] = useState(null);
  const [email, setEmail] = useState('');
  const [phone_num, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [is_email_subscribed, setEmailSubscribed] = useState(false);
  const [is_text_subscribed, setTextSubscribed] = useState(false);


  const register = () => {
    axios.post(`/auth/register`, { first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, apartment_num, password }).then(props.history.push('/')).catch(err => err.message)
  }



  return (
    <div className='main-register-container'>
      <div className='input-container'>
        <input placeholder='First Name' onChange={e => setFirstName(e.target.value)} />
        <input placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
        <input placeholder='Apartment Number' type='number' min='1' max='64' onChange={e => setApartNum(e.target.value)} />
        <input placeholder='Email' onChange={e => setEmail(e.target.value)} />
        <input placeholder='Phone Number (optional)' onChange={e => setPhone(e.target.value)} />
        <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />
      </div>
      <div className='notifications'>
        <div>
          <label name='email'>Email Notifications</label>
          <input className='checkbox' type='checkbox' name='email' onClick={() => setEmailSubscribed(!is_email_subscribed)} />
        </div>
        <div>
          <label name='text'>Text Notifications</label>
          <input className='checkbox' type='checkbox' name='text' onClick={() => setTextSubscribed(!is_text_subscribed)} />
        </div>
      </div>
      <button className='register-button' onClick={() => register()}>Register</button>
    </div>
  )
}

export default Register;