import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
// import { useUserContext } from './UserContext';

// const SECRET_CODE = 'admin_code';
// const SECRET_CODE_U = 'user_code';
// const SECRET_CODE_E = 'editor_code';

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const { setUserRole } = useUserContext();
   const [role, setRole] = useState("");
  // const [secretCode, setSecretCode] = useState('');

  // const SECRET_CODE = 'admin_code';

  const navigate = useNavigate();

  const isUsernameValid = (username) => {
    return username.length >= 8;
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isUsernameValid(username) || !isPasswordValid(password)) {
      setErrorMessage("Please enter a valid username and password.");
      return;
    }

    // if (role === 'Admin' && secretCode !== SECRET_CODE) {
    //   setErrorMessage('Invalid secret code.');
    //   return;
    // }
    // if (role === 'User' && secretCode !== SECRET_CODE_U) {
    //   setErrorMessage('Invalid secret code.');
    //   return;
    // }
    // if (role === 'Editor' && secretCode !== SECRET_CODE_E) {
    //   setErrorMessage('Invalid secret code.');
    //   return;
    // }

    try {
      let response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password , role }),
      });

      //   const data = await response.json();

      if (response.status === 200) {
        setErrorMessage("Login Successful.");
        
        
        const data = await response.json();

        const userRole = data.role;

        switch (userRole) {
          case "Admin":
            navigate("/admindashboard");
            break;
          case "User":
            navigate("/profile");
            break;
          case "Editor":
            navigate("/editordashboard");
            break;
          default:
            setErrorMessage("Role not defined.");
        }
      } else if (response.status === 400) {
        setErrorMessage("User not found");
      } else if (response.status === 401) {
        setErrorMessage("Invalid password");
      } else {
        console.error("error");
        setErrorMessage(
          "Authentication failed. Please check your username and password."
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred during login. Please try again later."
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or Email"
          />
        </div>
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
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
