import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Support from './pages/Support'

function App() {

  return (
    <BrowserRouter>
      <div className="wrapper"> 
        <Link to="/">Home</Link>
        <Link to="/support">Support</Link>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/support" element={<Support />} />  

        </Routes>

        <footer>footer</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
