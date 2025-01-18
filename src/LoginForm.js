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
      if(response.data.type_utilisateur=='enseignant'){
        localStorage.setItem('id_ens', response.data.result[0].id_ens);
        console.log(response.data.result[0].id_ens);
        localStorage.setItem('est_responsable', response.data.result[0].est_responsable);
      }
      else if(response.data.type_utilisateur=='etudiant'){
        localStorage.setItem('id_etud', response.data.result[0].id);
        localStorage.setItem('intitule_option', response.data.result[0].intitule_option);
        console.log(response.data.result[0].intitule_option+"e");
      }
      else if(response.data.type_utilisateur=='entreprise'){
      
        localStorage.setItem('ident', response.data.result[0].id_entreprise);
      }
    
      localStorage.setItem('nom', response.data.nom);
      localStorage.setItem('prenom', response.data.prenom);
      localStorage.setItem('type_utilisateur', response.data.type_utilisateur);
      localStorage.setItem('id', response.data.message);
      if(response.data.type_utilisateur == "Admin")
      window.location.href = `/admin`;
      else if (response.data.type_utilisateur == "etudiant")
        window.location.href = `/etudiant`;
      else if (response.data.type_utilisateur == "enseignant")
        window.location.href = `/enseignant`;
      else if (response.data.type_utilisateur == "entreprise")
        window.location.href = `/entreprise`;

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
