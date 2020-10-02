import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/reducer';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post(`/auth/login`, { email, password }).then(res => {
      props.loginUser(res.data.user_id, res.data.first_name, res.data.last_name);
      if (res.data.user_role === 'ADMIN') {
        props.history.push('/admindashboard');
      } else {
        props.history.push('dashboard');
      }
    })
      .catch(err => alert(err.message))
  }

  return (
    <div>
      <input placeholder='Email' type='text' onChange={e => setEmail(e.target.value)} />
      <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />
      <button onClick={() => login()}>Log In</button>
      <button onClick={() => props.history.push('/register')}>Register</button>
    </div>
  )
}

export default connect(null, { loginUser })(Login);