import React, { useEffect, useState } from 'react';

export default function Marketplace(props) {
  const [wallets, setWallets] = useState(['0x3007888b21fB635B9029E21E958C2c1C460e5d0a']);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchNFTs = async (id) => {
      try {
        const response = await fetch(
          `https://testnets-api.opensea.io/v2/chain/base_goerli/account/${id}/nfts`
        );
        const data = await response.json();
        console.log(data.nfts);

        for (const d of data.nfts) {
          const metadata = await fetch(
            `https://maroon-active-mole-538.mypinata.cloud/ipfs/${d.metadata_url.substring('ipfs://'.length)}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`
          );
          const metadataData = await metadata.json();
          const itemWithData = { ...d, metadataData };
          console.log(itemWithData)
          setItems((prevItems) => [...prevItems, itemWithData]);
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

  const handleBuy = (itemId) => {
    console.log(`Buy button clicked for item ${itemId}`);
  };

  return (
    <div>
      <h2>Marketplace</h2>
      {items.map((item) => (
        <div key={item.contract}>
          <span>Name: {item.name}</span><br></br>
          <span>Contract: {item.contract}</span>
          <img src={`https://maroon-active-mole-538.mypinata.cloud/ipfs/${item.metadataData.image.substring('ipfs://'.length)}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`} alt="Item Image" />
          <ul>
            {Object.values(item.metadataData.capabilities).map((value, index) => (
                <li key={index}>{value}</li>
            ))}
          </ul>
          <button onClick={() => handleBuy(item.id)}>Buy</button>
        </div>
      ))}
    </div>
  );
}