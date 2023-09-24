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