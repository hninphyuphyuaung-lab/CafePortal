import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CafePage from './pages/CafePage';
import EmployeePage from './pages/EmployeePage';
import AddEditCafe from './components/AddEditCafe';
import AddEditEmployee from './components/AddEditEmployee';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/cafes" element={<CafePage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/add-cafe" element={<AddEditCafe />} />
        <Route path="/edit-cafe/:id" element={<AddEditCafe />} />
        <Route path="/add-employee" element={<AddEditEmployee />} />
        <Route path="/edit-employee/:id" element={<AddEditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
