import React from 'react';
import './LoginForm.css';
import pfeImage from './assets/pfe.png';

function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>WELCOME BACK</h1>
        <p>Welcome back! Please enter your details.</p>
        
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="********" />

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#forgot-password">Forgot password</a>
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
      
      <div className="illustration">
       
        <img src={pfeImage} alt="Welcome illustration" />

      </div>
    </div>
  );
}

export default LoginForm;
