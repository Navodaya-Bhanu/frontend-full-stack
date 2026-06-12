import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  let location = useLocation();
  let navigate = useNavigate();
  
  let userData = location.state || {}; 

  let handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {userData.username || "User"}! 🎉</h1>
      <p>Registration/Login Successful.</p>
      {userData.email && <p>Logged in email: {userData.email}</p>}
      {userData.number && <p>Contact number: {userData.number}</p>}
      {userData.states && <p>State: {userData.states}</p>}
      {userData.city && <p>City: {userData.city}</p>}
      <hr />
      <button onClick={handleLogout} style={{ cursor: 'pointer', marginTop: '10px' }}>Logout</button>
    </div>
  );
}
