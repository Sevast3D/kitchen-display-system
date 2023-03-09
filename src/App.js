import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
      </Routes>
    </Router>
        // <Login />
  );
}

export default App;
