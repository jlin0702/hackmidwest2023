import {react, useState, useEffect} from 'react'
import Modal from 'react-modal';

import BattlePanel from './battle-panel'
import Battlefield from './battlefield';

import styles from '../styles/battle-page.module.css';
import { io } from 'socket.io-client';

const id = (Math.floor(Math.random() * 100000000));
const socket = io('http://localhost:8000');
// socket.emit("connect-to-game", id);

function BattlePage() {
    const modalStyles = {
      content: {
        width: '400px',
        height: '400px',
        margin: 'auto',
        fontSize: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
    };
  
    const queryParameters = new URLSearchParams(window.location.search);
    const walletKey = queryParameters.get('walletKey');
    const [showPopup, setShowPopup] = useState(true);
    const [items, setItems] = useState([]);
    const [wallets, setWallets] = useState([walletKey]);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true); // New state for loading
  
    const handleItemClick = (item) => {
      console.log(item)
      setSelectedPokemon(item);
      setShowPopup(false);
    };
  
    const closePopup = () => {
      setShowPopup(false);
    };
  
    useEffect(() => {
      setItems([]);
      setWallets(walletKey);
      const fetchNFTs = async (id) => {
        try {
          const response = await fetch(
            `https://testnets-api.opensea.io/v2/chain/base_goerli/account/${id}/nfts`
          );
          const data = await response.json();
          console.log(data.nfts);
  
          for (const d of data.nfts) {
            if (
              d.contract != '0xfcbf0cc994e45645e3ee0e6ec38624f375c31d77' ||
              d.name != 'Pokemon1' ||
              d.metadata_url != null
            ) {
              console.log(d);
              const metadata = await fetch(
                `https://maroon-active-mole-538.mypinata.cloud/ipfs/${d.metadata_url.substring(
                  'ipfs://'.length
                )}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`
              );
              const metadataData = await metadata.json();
              const itemWithData = { ...d, metadataData };
              console.log(itemWithData);
              setItems((prevItems) => [...prevItems, itemWithData]);
            }
          }
          setIsLoading(false); // Set loading state to false when data is fetched
        } catch (error) {
          console.error('Error fetching NFTs:', error);
        }
      };
  
      const fetchAllNFTs = async () => {
        for (const id of wallets) {
          await fetchNFTs(id);
        }
      };
  
      fetchAllNFTs();
    }, []);
  
    useEffect(()=>{
        socket.emit("connect-to-game", selectedPokemon, id);
        console.log("SELECTED", selectedPokemon);
    },[selectedPokemon])

    return (
      <>
        <Modal isOpen={showPopup} onRequestClose={closePopup} style={modalStyles}>
          <h3>Choose your monster</h3>
          {items.map((item) => (
            <div key={item.contract} onClick={() => handleItemClick(item)}>
              <img
                src={`https://maroon-active-mole-538.mypinata.cloud/ipfs/${item.metadataData.image.substring(
                  'ipfs://'.length
                )}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`}
                alt="Item Image"
                height={150}
                width={150}
              />
            </div>
          ))}
        </Modal>
        <div className={styles.container}>
          {Object.keys(selectedPokemon).length > 0 ? ( // Conditionally render the divs when selectedPokemon is not empty
            <>
              <div style={{ height: '10em' }}></div>
              <Battlefield socket={socket} id={id} monster={selectedPokemon} />
              <BattlePanel socket={socket} id={id} monster={selectedPokemon} />
            </>
          ) : (
            // Render loading message or spinner when selectedPokemon is empty
            <div>Loading...</div>
          )}
        </div>
      </>
    );
  }
  
  export default BattlePage;