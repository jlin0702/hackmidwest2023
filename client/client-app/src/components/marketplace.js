import React from 'react'

export default function Marketplace() {
        const items = [
          { id: 1, name: 'Item 1', price: 10 },
          { id: 2, name: 'Item 2', price: 20 },
          { id: 3, name: 'Item 3', price: 30 },
        ];
      
        const handleBuy = (itemId) => {
          console.log(`Buy button clicked for item ${itemId}`);
        };
      
        return (
          <div>
            <h2>Marketplace</h2>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <button onClick={() => handleBuy(item.id)}>Buy</button>
                </li>
              ))}
            </ul>
          </div>
        );
    
}
