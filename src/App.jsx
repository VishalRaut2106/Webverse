import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </SmoothScroll>
    </Router>
  );
}

export default App;
