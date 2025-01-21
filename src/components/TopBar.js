import React, { useState, useEffect } from 'react';
import styles from './TopBar.module.css';
import PROFILE from '../assets/12.jpg';
import axios from 'axios';

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0); // Set the initial unread count as 0

  const nom = localStorage.getItem('nom');
  const prenom = localStorage.getItem('prenom');
  const type_utilisateur = localStorage.getItem('type_utilisateur');
  const ident = localStorage.getItem('ident');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/choixBinome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_etu2: 5 }),
        });

        const data = await response.json();
        console.log(data); 

        if (data.status === 'success') {
          // Map the data into notifications array with unique id and message
          const themes = data.data.map((item, index) => ({
            id: index + 1, // Generate a unique id for each notification
            message: `${item.titre_theme} - ${item.nom} ${item.prenom}` // Combine titre_theme, nom, and prenom
          }));
        
          setNotifications(themes);
          setUnreadCount(themes.length); // Set unread count based on the notifications length
        }
        
      } catch (error) {
        console.error('There was an error fetching notifications!', error);
      }
    };

    fetchNotifications();
  }, []); 

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (unreadCount > 0) {
      setUnreadCount(0); // Mark all as read
    }
  };

  // Accept notification handler
  const handleAccept = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    setUnreadCount(unreadCount - 1);
  };

  // Reject notification handler
  const handleReject = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id)); 
    setUnreadCount(unreadCount - 1);
  };

  return (
    <div className={styles.topbar}>
      <input type="text" placeholder="Search for anything..." className={styles.searchbar} />
      <div className={styles.userprofile}>
        {/* Notifications */}
        <div className={styles.notifications}>
          <button
            className={styles.notificationBell}
            onClick={toggleNotifications}
          >
            🔔
            {unreadCount > 0 && (
              <span className={styles.notificationCount}>{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <h4>Notifications</h4>
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id} className={styles.notificationItem}>
                      <p>{notification.message}</p>
                      <div className={styles.buttons}>
                        <button
                          className={styles.acceptButton}
                          onClick={() => handleAccept(notification.id)}
                        >
                          Accept
                        </button>
                        <button
                          className={styles.rejectButton}
                          onClick={() => handleReject(notification.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No notifications</li>
                )}
              </ul>
              <button
                className={styles.clearNotifications}
                onClick={() => setNotifications([])}
              >
                Clear Notifications
              </button>
            </div>
          )}
        </div>
        {/* User Info */}
        <div className={styles.texte}>
          <h4>{nom} {prenom} <small>{type_utilisateur}</small></h4>
        </div>
        <div className={styles.profilepic}>
          <img src={PROFILE} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
