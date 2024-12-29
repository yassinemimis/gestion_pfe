import React, { useState } from 'react';

import pfeImage from './assets/pfe.png';
import axios from 'axios';
import styles3 from "./LoginForm.module.css"; 
function LoginForm() {
  const [adresse_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        adresse_email,
        password,
      });
      console.log(response.data.message1);
      console.log(response.data.message);
      console.log(response.data.success);
      localStorage.setItem('role', response.data.success);
      localStorage.setItem('id', response.data.message);
      window.location.href = `/admin`;
    } catch (error) {
      setError(error.response.data.message || 'Login failed');
    }
  };
  return (
    <div className={styles3.logincontainer}>
      <div className={styles3.loginform}>
        <h1>WELCOME BACK</h1>
        <p>Welcome back! Please enter your details.</p>
        <form >
          <label>Email</label>
          <input
        type="email"
        value={adresse_email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
          <label>Password</label>
          <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#forgot-password">Forgot password</a>
          </div>

          <button type="submit"   onClick={handleLogin}>Login</button>
        </form>
      </div>
      
      <div className={styles3.illustration}>
       
        <img src={pfeImage} alt="Welcome illustration" />

      </div>
    </div>
  );
}

export default LoginForm;
