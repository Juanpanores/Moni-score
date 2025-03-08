import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ScoringForm from './routs/UserForm/ScoringForm';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScoringForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
