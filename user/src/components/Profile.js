import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
 

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Profile</h2>
       
          <p>Name:</p> 
       <p>Email: name@example.com</p>
        <p> About the user </p>

        <Link to="/login">
          <button className="logout-button">Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;