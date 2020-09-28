import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post(`/auth/login`, { email, password }).then(res => {
      console.log(res.data)
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

export default Login;