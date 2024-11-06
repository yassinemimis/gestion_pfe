import React from 'react';
import './TopBar.css';
import PROFILE from '../assets/12.jpg';
const TopBar = () => {
  return (
    <div className="top-bar">
      <input type="text" placeholder="Search for anything..." className="search-bar" />
      <div className="user-profile">
       <div className="texte"> 
        <span>KHERBOUCHE YASSINE</span>
        <small>Teacher</small>
        </div>
        <div className="profile-pic">  <img src={PROFILE} alt="Profile" /></div>
      </div>
    </div>
  );
};

export default TopBar;
