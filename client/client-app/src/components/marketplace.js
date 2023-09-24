import React, { useEffect, useState } from 'react';
import styles from '../styles/marketplace.module.css';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [spa, setspa] = useState('');
  const [ypa, setypa] = useState('');
  const [wallet, setWallet] = useState('')
  const queryParameters = new URLSearchParams(window.location.search)
  const walletKey = queryParameters.get("walletKey")
  const [id, setId] = useState(null)
  const [wallets, setWallets] = useState([walletKey]);

  

  const modalStyles = {
    content: {
      width: '900px', // Adjust the width as per your requirement
      height: '400px', // Adjust the height as per your requirement
      margin: 'auto',
      fontSize: '30px',
    },
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(selectedItem)
    const requestBody = {
        senderpa: spa,
        yprivate: ypa,
        ypublic: walletKey,
        selectedItem: selectedItem,
        id: id
      };
  await fetch('http://localhost:8000/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log('Response:', data);
    })
    
    // Reset the input fields
    setspa('');
    setypa('');
    // Close the modal
    closePopup();
    window.location.reload(true);
    }
    

  useEffect(() => {
    setItems([])
    setWallet(walletKey)
    const fetchNFTs = async (id) => {
      try {
        const response = await fetch(
          `https://testnets-api.opensea.io/v2/chain/base_goerli/account/${id}/nfts`
        );
        const data = await response.json();
        console.log(data.nfts);
        
        for (const d of data.nfts) {
            if (d.contract != "0xfcbf0cc994e45645e3ee0e6ec38624f375c31d77"||d.name != "Pokemon1" ||d.metadata_url != null) {
                console.log(d)
                const metadata = await fetch(
                    `https://maroon-active-mole-538.mypinata.cloud/ipfs/${d.metadata_url.substring('ipfs://'.length)}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`
                  );
                  const metadataData = await metadata.json();
                  const itemWithData = { ...d, metadataData };
                  console.log(itemWithData)
                  setItems((prevItems) => [...prevItems, itemWithData]);
            }
        }
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

  const handleBuy = (item,id) => {
    setShowPopup(true)
    setSelectedItem(item)
    setId(id)
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedItem('')
    setId(null)
    }

    const handleInputChange1 = (e) => {
        setspa(e.target.value);
      };
    
      const handleInputChange2 = (e) => {
        setypa(e.target.value);
      };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Marketplace</h2>
      <div className={styles.container}>
      {items.map((item) => (
        <div key={item.contract}>
          <p>Name: {item.name}</p>
          <p style={{fontSize: 1.25 + 'em'}}>Contract: {item.contract}</p>
          <img src={`https://maroon-active-mole-538.mypinata.cloud/ipfs/${item.metadataData.image.substring('ipfs://'.length)}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`} alt="Item Image" />
          <button onClick={() => handleBuy(item.contract, item.identifier)}>Transfer</button>
          <Modal
          isOpen={showPopup}
          onRequestClose={closePopup}
          style={modalStyles}
        >
          <h3>Transfer NFT</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Recipient public address: 
              <input type="text" value={spa} onChange={handleInputChange1} />
            </label><br/>
            <label>
              Your private address:
              <input type="text" value={ypa} onChange={handleInputChange2} />
            </label>
            <br/>
            <button type="submit">Transfer</button>
          </form>
        </Modal>
        </div>
      ))}

      </div>
    </div>
  );
}
