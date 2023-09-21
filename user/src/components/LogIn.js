import React, { useState } from 'react';
import './LogIn.css'


function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


   const isUsernameValid = (username) => {
    // Implement username validation logic here
    return username.length >= 8;
  };

  const isPasswordValid = (password) => {
     // Implement password validation logic here
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    if (!isUsernameValid(username) || !isPasswordValid(password)) {
      setErrorMessage('Please enter a valid username and password.');
      return;
    }

    try {
      let response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

    //   const data = await response.json();

      if (response.status === 200) {
        
        setErrorMessage('Login Successful.');
      } else if (response.status === 400) {
        setErrorMessage('User not found');
      } else if (response.status === 401) {
        setErrorMessage('Invalid password');
      } else {
        console.error("error");
        setErrorMessage('An error occurred during login. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LogIn;
