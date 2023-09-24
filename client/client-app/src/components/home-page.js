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
        <p>PokeNFT is a web app designed to rejuvenate NFT trading by turning it into a game that everyone knows and loves - Pokémon!</p>
        <h3>About Us</h3>
        <p>Our team had to overcome many challenges over the course of the hackathon. Before this hackathon, none of us had ever worked with NFTs before. During the hackathon, we learned about how NFT, the BlockChain, Ethereum, and NFT protocols work. This was the first time at HackMidwest for 2 of our members. One of our members was completely new to the team. And one of our planned teammates canceled on the hackathon the morning of. Yet, we finished the hackathon victorious with a finished product and many new skills!</p>
        <h3>Jackie</h3>
        <h3>James Hanselman</h3>
        <p>Responsibilities</p>
        <ul>
          <li>Designed and created the battle page</li>
          <li>Implemented web sockets for fascilitating gameplay between 2 users at the same time</li>
        </ul>
        <h3>Katie Nordberg</h3>
        <p>I was challenged this weekend to learn many new skills. I have never worked with React before and I had absolutely no knowledge about NFTs, blockchain, or anything like that. But by the end of this hackathon, I had minted my own NFTs, own my own blockchain wallet, used pinata to store files for NFTs, own ethereum, and traded NFTs!</p>
        <p>Responsibilities</p>
        <ul>
          <li>Style Marketplace and Homepage</li>
          <li>Setup APIs such as Pinata and OpenSea</li>
        </ul>
      </div>
    </>
  );
}
