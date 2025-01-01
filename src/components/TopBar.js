import React from 'react';
import './TopBar.css';
import PROFILE from '../assets/12.jpg';
const TopBar = () => {
  const nom = localStorage.getItem('nom');
  const prenom = localStorage.getItem('prenom');
  const type_utilisateur = localStorage.getItem('type_utilisateur');
    return (
    <div className="top-bar">
      <input type="text" placeholder="Search for anything..." className="search-bar" />
      <div className="user-profile">
       <div className="texte"> 
        <h4>{nom} {prenom} <small>{type_utilisateur}</small></h4>
        
        </div>
        <div className="profile-pic">  <img src={PROFILE} alt="Profile" /></div>
      </div>
    </div>
  );
};

export default TopBar;
