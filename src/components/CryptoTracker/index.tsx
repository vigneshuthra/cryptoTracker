import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoTracker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);

  const fetchCryptoData = () => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => console.error('Error fetching cryptocurrency data:', error));
  };

  useEffect(() => {
    fetchCryptoData();

    const intervalId = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Cryptocurrency Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Market Cap (USD)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto: any) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>${crypto.current_price.toFixed(2)}</td>
              <td>${crypto.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTracker;
