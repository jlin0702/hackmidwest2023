import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './styles/colors.css';
import BattlePage from './components/battle-page.js';
import HomePage from './components/home-page.js';
import Marketplace from './components/marketplace.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/marketplace" element={<Marketplace/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;