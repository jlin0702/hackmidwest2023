import React, { useState, useEffect } from 'react'

import styles from '../styles/marketplace.module.css';

export default function Marketplace() {
        const items = [
          { id: 1, name: 'Item 1', price: 10 },
          { id: 2, name: 'Item 2', price: 20 },
          { id: 3, name: 'Item 3', price: 30 },
        ];

        const handleBuy = (itemId) => {
          console.log(`Buy button clicked for item ${itemId}`);
        };

        const [forSale, setForSale] = useState();
        useEffect(() => {

          // function GetImage (itemId) {
          //   // get image from useState
          //   let [mainAcc, setMainAcc] = useState();
          //   fetch("https://testnets-api.opensea.io/v2/chain/base_goerli/account/0xDFF010A4df0E99C303519086184e6B1717b5cE57/nfts")
          //   // .then(res => res.json())
          //   .then(data => console.log(data));
          // }
          // get image from useState
          // let [mainAcc, setMainAcc] = useState();
          fetch("https://testnets-api.opensea.io/v2/chain/base_goerli/account/0x3007888b21fB635B9029E21E958C2c1C460e5d0a/nfts")
          .then(res => res.json())
          .then(wallet => {
             console.log(wallet);
             // wallet.nfts is an array so map and return the ones that match metadata_url != 0.
             setForSale(wallet.nfts.filter(n => n.metadata_url != null));
             // for (const nft in wallet.nfts) {
             //   console.log('NFT: ', nft.metadata_url);
             // }
          })
        },[]);

        console.log(forSale[0].name);

        return (
          <div>
            <h2>Marketplace</h2>
            <p>{forSale[0].name}</p>
            <ul className={styles.container}>
              {items.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <img src="https://gateway.pinata.cloud/ipfs/Qmc3gWiMKiRhnc61oSL3nR4Dg5NfJArNiQ2DZA6wpppKT4" />
                  <button onClick={() => handleBuy(item.id)}>Buy</button>
                </li>
              ))}
            </ul>
          </div>
        );

}
