import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CryptoTracker.css';

const CryptoTracker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coinlore.net/api/tickers/');
        setCryptoData(response.data.data);
        localStorage.setItem('cryptoData', JSON.stringify(response.data.data));
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getCachedData = () => {
      const cachedData = localStorage.getItem('cryptoData');
      if (cachedData) {
        setCryptoData(JSON.parse(cachedData));
      }
    };

    getCachedData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = cryptoData.slice(startIndex, endIndex);

  return (
    <div>
      <center>
        <h2>Cryptocurrency Tracker</h2>
      </center>
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Rank</th>
            <th>Price (USD)</th>
            <th>Market Cap (USD)</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((crypto: any) => (
            <tr key={crypto.id}>
              <td>
                {crypto.name}
              </td>
              <td>
                {crypto.rank}
              </td>
              <td>{crypto.symbol}</td>
              <td>${parseFloat(crypto.price_usd).toFixed(2)}</td>
              <td>${parseFloat(crypto.market_cap_usd).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={endIndex >= cryptoData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoTracker;
