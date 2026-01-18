// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Support from './pages/Support';
import Faqs from './pages/Faqs';
import ContactUs from './pages/ContactUs';
import DownloadNotes from './pages/DownloadNotes';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/Download-notes" element={<DownloadNotes />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
