import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  
  return (
    <aside className="sidebar">
      <div className="logo">LOGO</div>
      <div className="divider"></div>


      <nav className="menu">
        <ul>
          <li>Home</li>
          <li>Messages</li>
          <li>Tasks</li>
          <li>Members</li>
          <li>Settings</li>
        </ul>
      </nav>
      <div className="projects">
        <h4>My Projects</h4>
        <ul>
          <li className="project active">Bookify <span className="dots">...</span></li>
          <li className="project">FoodTrack</li>
          <li className="project">SmartPark</li>
          <li className="project">TourConnect</li>
        </ul>
      </div>
      <div className="thoughts-time-container">
        <div className="circle">
          <div className="circle2">
          
        </div>  <i className="fas fa-lightbulb lamp-icon"></i></div>
        <div className="thoughts">
          <h5>Thoughts Time</h5>
          <p>We don’t have any notice for you. If there’s an idea, share your thoughts with your peers.</p>
          <button>Write a message</button>
        </div>
      </div>
    </aside>

  );
};

export default Sidebar;
