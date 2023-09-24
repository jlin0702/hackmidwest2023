import './home-page.css';
import { Link } from 'react-router-dom';

import useSound from 'use-sound';
import marketSound from '../market.mp3';
import battleSound from '../battle.mp3';

export default function HomePage() {
  const battleSoundUrl = battleSound;
  const marketSoundUrl = marketSound;
  const [playBattle] = useSound(battleSound);
  const [playMarket] = useSound(marketSound);

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
          <div className="clickableDiv" onClick={handleBattleClick} onMouseEnter={playBattle}>
            <h3>Battle</h3>
            <p className="homepage-p">Think you have what it takes to win? We'll see about that. Bring your best fighters and compete against real people.</p>
          </div>
        </Link>
        </div>
        <div className="menuItem">
        <Link to="/marketplace">
          <div className="clickableDiv" onClick={handleMarketplaceClick} onMouseEnter={playMarket}>
            <h3>Marketplace</h3>
            <p className="homepage-p">Ready to expand your roster? Or maybe you're ready for your very first friend/fighter. Get your own unique fighter NFT right here at the Marketplace.</p>
          </div>
        </Link>
        </div>
        <div className="content">
          <p className="homepage-p">PokeNFT is a web app designed to rejuvenate NFT trading by turning it into a game that everyone knows and loves - Pokémon!</p>
          <span className="aboutUs">About Us</span>
          <p className="homepage-p">Our team had to overcome many challenges over the course of the hackathon. Before this hackathon, none of us had ever worked with NFTs before. During the hackathon, we learned about how NFT, the BlockChain, Ethereum, and NFT protocols work. This was the first time at HackMidwest for 2 of our members. One of our members was completely new to the team. And one of our planned teammates canceled on the hackathon the morning of. Yet, we finished the hackathon victorious with a finished product and many new skills!</p>
          <span class="homepage-span">Jacky Lin</span><br/>
          <p className="homepage-p">Responsibilities</p>
          <ul>
            <li className="homepage-li">Mint NFTs</li>
            <li className="homepage-li">Work with James to implement web sockets for fascilitating gameplay between 2 users at the same time</li>
          </ul>
          <span class="homepage-span">Elen Bhattarai</span><br/>
          <p className="homepage-p">Responsibilities</p>
          <ul>
            <li className="homepage-li">Make marketplace backend for trading and buying NFTs</li>
            <li className="homepage-li"></li>
          </ul>
          <span class="homepage-span">James Hanselman</span>
          <p className="homepage-p">Responsibilities</p>
          <ul>
            <li className="homepage-li">Design and create the battle page</li>
            <li className="homepage-li">Work with Jacky to implement web sockets for fascilitating gameplay between 2 users at the same time</li>
            <li className="homepage-li">Make battle functionality</li>
          </ul>
          <span className="homepage-span">Katie Nordberg</span>
          <p className="homepage-p">I was challenged this weekend to learn many new skills. I have never worked with React before and I had absolutely no knowledge about NFTs, blockchain, or anything like that. But by the end of this hackathon, I had minted my own NFTs, own my own blockchain wallet, used pinata to store files for NFTs, own ethereum, and traded NFTs!</p>
          <p className="homepage-p">Responsibilities</p>
          <ul>
            <li className="homepage-li">Make the front end and style the Marketplace and Homepage</li>
            <li className="homepage-li">Setup APIs, including Pinata and OpenSea</li>
            <li className="homepage-li">Research NFT standards</li>
            <li className="homepage-li">Learn how to use React</li>
          </ul>
        </div>
      </div>
    </>
  );
}
