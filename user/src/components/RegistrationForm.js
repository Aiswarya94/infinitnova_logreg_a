import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

function RegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState("");
    // const [secretCode, setSecretCode] = useState(''); 

    const navigate = useNavigate();
    const isUsernameValid = (username) => {
        // Implement username validation logic here
        return username.length >= 8;
      };
    
      const isPasswordValid = (password) => {
         // Implement password validation logic here
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        return passwordRegex.test(password);
      };
      const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!isUsernameValid(username)) {
        setErrorMessage('Please enter a valid username .');
        return;
      }
      if (!isPasswordValid(password)) {
        setErrorMessage('Please enter a valid password.');
        return;
      }
      if (!isEmailValid(email)) {
        setErrorMessage('Please enter a valid email.');
        return;
      }
      if(!(role === 'Admin' || role === 'User' || role === 'Editor')){
        setErrorMessage('Role is undefined.');
        return;
      }

    let result = await fetch(
    'http://localhost:5000/register', {
        method: "post",
        body: JSON.stringify({ firstName,lastName,email,role,username,password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    result = await result.json();
    console.warn(result);
    if (result) {
        alert("Data saved succesfully");
        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setRole("");

        navigate('/LogIn');
    }
}

  return (
    <div className="registration-container">
        
      <form  className="registration-form">
      <h2>Registration Form</h2>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Id"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />
        </div>
        {/* {role === 'admin' && (
  <div className="form-group">
    <input
      type="password"
      name="secretCode"
      value={secretCode}
      onChange={(e) => setSecretCode(e.target.value)}
      placeholder="Secret Code"
    />
  </div>
        )} */}
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" onClick={handleOnSubmit}>Submit</button>
      </form>
    </div>
  );
};
  
export default RegistrationForm;
