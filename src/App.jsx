import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './responsive.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Support from './pages/Support';
import Faqs from './pages/Faqs';
import ContactUs from './pages/ContactUs';
import DownloadNotes from './pages/DownloadNotes';
import SolvedMcqsPage from './pages/SolvedMcqsPage';
import AboutUs from './pages/AboutUs';
import LmsHandled from './pages/LmsHandled'; 
import StudentResults from './pages/StudentResults';
import CiscoCourses from './pages/CiscoCourses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/download-notes" element={<DownloadNotes />} /> 
          <Route path="/solved-mcqs" element={<SolvedMcqsPage />} /> 
          <Route path="/about-us" element={<AboutUs />} /> 
          <Route path="/lms-handled" element={<LmsHandled />} />  
          <Route path="/student-results" element={<StudentResults />} />  
          <Route path="/cisco-courses" element={<CiscoCourses />} />  


          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;