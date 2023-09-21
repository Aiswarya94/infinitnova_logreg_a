import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LogIn from './components/LogIn';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<RegistrationForm />} /> 
        <Route path="/login" element={<LogIn/>} />
          </Routes>
    </BrowserRouter>

  );
}

export default App;
