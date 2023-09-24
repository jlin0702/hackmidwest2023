import React from 'react';
import './home-page.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleBattleClick = () => {
    const walletKey = window.prompt('Please enter your public wallet key:');
    if (walletKey) {
      navigate('/battle');
    }
  };

  const handleMarketplaceClick = () => {
    const walletKey = window.prompt('Please enter your public wallet key:');
    if (walletKey) {
      navigate('/marketplace');
    }
  };

  return (
    <>
      <div>
        <h1>PokeNFT</h1>
        <Link to="/battle">
          <div className="clickableDiv" onClick={handleBattleClick}>
            Battle
          </div>
        </Link>
        <Link to="/marketplace">
          <div className="clickableDiv" onClick={handleMarketplaceClick}>
            Marketplace
          </div>
        </Link>
      </div>
    </>
  );
}