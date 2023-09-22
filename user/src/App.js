import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import EditorDashboard from './components/EditorDashboard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<RegistrationForm />} /> 
        <Route path="/login" element={<LogIn/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/editordashboard" element={<EditorDashboard/>} />
          </Routes>
    </BrowserRouter>

  );
}

export default App;
