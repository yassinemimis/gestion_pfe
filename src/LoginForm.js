import React, { useState } from 'react';
import './LoginForm.css';
import pfeImage from './assets/pfe.png';
import axios from 'axios';
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
      console.log(response.data);
      console.log(response);

    } catch (error) {
      setError(error.response.data.message || 'Login failed');
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
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
      
      <div className="illustration">
       
        <img src={pfeImage} alt="Welcome illustration" />

      </div>
    </div>
  );
}

export default LoginForm;
