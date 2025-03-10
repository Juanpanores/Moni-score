import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ScoringForm from './routs/ScoringForm/ScoringForm';
import UserTable from './routs/UserTable/UserTable';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScoringForm />} />
        <Route path="/user-table" element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
