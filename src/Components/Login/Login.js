import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/reducer';
import './login.css'
import spray from '../../assets/pics/spray-bottle.png';


function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post(`/auth/login`, { email, password }).then(res => {
      props.loginUser(res.data.user_id, res.data.first_name, res.data.last_name, res.data.user_role);
      if (res.data.user_role === 'ADMIN') {
        props.history.push('/admindashboard');
      } else {
        props.history.push('/dashboard');
      }
    })
      .catch(err => alert(err.message))
  }

  return (
    <div className='login-container'>
      <div className="input-container">
        <img className='app-logo' src={spray} alt='spray bottle logo' />
        <input placeholder='Email' type='text' onChange={e => setEmail(e.target.value)} />
        <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />

      </div>
      <div className='login-registration-btn-container'>
        <button className='login-buttons' onClick={() => login()}>Log In</button>
      </div>

      <div className='register-container'>
        <div className='no-account'>
          <div className='register-line'></div>
          <div className='no-account-text'>Don't have an account?</div>
          <div className='register-line'></div>
        </div>

        <button className='login-buttons' onClick={() => props.history.push('/register')}>Register Here</button>
      </div>
    </div>
  )
}

export default connect(null, { loginUser })(Login);