// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ApartmentPage from './pages/ApartmentPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/apartments" element={<ApartmentPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
