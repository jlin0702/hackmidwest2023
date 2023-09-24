import './home-page.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const handleBattleClick = () => {
    const walletKey = window.prompt('Please enter your public wallet key:');
    if (walletKey) {
      window.location.href = `/battle?walletKey=${encodeURIComponent(walletKey)}`;
    }
  };

  const handleMarketplaceClick = () => {
    const walletKey = window.prompt('Please enter your public wallet key:');
    if (walletKey) {
      window.location.href = `/marketplace?walletKey=${encodeURIComponent(walletKey)}`;
    }
  };

  return (
    <>
      <div className="page">
        <h1 className="title">PokeNFT</h1>
        <div className="menuItem">
        <Link to="/battle">
          <div className="clickableDiv" onClick={handleBattleClick}>
            <h3>Battle</h3>
            <p>Think you have what it takes to win? We'll see about that. Bring your best fighters and compete against real people. But be careful, if you lose, your fighter will be transfered to your opponent!</p>
          </div>
        </Link>
        </div>
        <div className="menuItem">
        <Link to="/marketplace">
          <div className="clickableDiv" onClick={handleMarketplaceClick}>
            <h3>Marketplace</h3>
            <p>Ready to expand your roster? Or maybe you're ready for your very first friend/fighter. Get your very own fighter NFT, items and powerups right here at the Marketplace.</p>
          </div>
        </Link>
        </div>
        <div className="content">
          <p>PokeNFT is a web app designed to rejuvenate NFT trading by turning it into a game that everyone knows and loves - Pokémon!</p>
          <span className="aboutUs">About Us</span>
          <p>Our team had to overcome many challenges over the course of the hackathon. Before this hackathon, none of us had ever worked with NFTs before. During the hackathon, we learned about how NFT, the BlockChain, Ethereum, and NFT protocols work. This was the first time at HackMidwest for 2 of our members. One of our members was completely new to the team. And one of our planned teammates canceled on the hackathon the morning of. Yet, we finished the hackathon victorious with a finished product and many new skills!</p>
          <span>Jackie</span><br/>
          <span>James Hanselman</span>
          <p>Responsibilities</p>
          <ul>
            <li>Designed and created the battle page</li>
            <li>Implemented web sockets for fascilitating gameplay between 2 users at the same time</li>
          </ul>
          <span>Katie Nordberg</span>
          <p>I was challenged this weekend to learn many new skills. I have never worked with React before and I had absolutely no knowledge about NFTs, blockchain, or anything like that. But by the end of this hackathon, I had minted my own NFTs, own my own blockchain wallet, used pinata to store files for NFTs, own ethereum, and traded NFTs!</p>
          <p>Responsibilities</p>
          <ul>
            <li>Style Marketplace and Homepage</li>
            <li>Setup APIs such as Pinata and OpenSea</li>
          </ul>
        </div>
      </div>
    </>
  );
}
