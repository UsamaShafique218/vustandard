// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Support from './pages/Support';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
