import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CryptoTracker.css";

const CryptoTracker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  console.log("🚀 ~ file: index.tsx:8 ~ cryptoData:", cryptoData)
  const [searchInput, setSearchInput] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coinlore.net/api/tickers/');
        setCryptoData(response?.data?.data);
        localStorage.setItem('cryptoData', JSON.stringify(response?.data?.data));
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

  const filteredCryptoData = cryptoData
    .filter((crypto) =>
      crypto.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    cryptoData.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchInput.toLowerCase())
    ).length / itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <center>
        <h2>Cryptocurrency Tracker</h2>
        <input
          className='search-bar'
          type="text"
          placeholder="Search by name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </center>

      <table className="crypto-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Rank</th>
            <th>Price (USD)</th>
            <th>Market Cap (USD)</th>
            <th>Price (BTC)</th>

          </tr>
        </thead>
        <tbody>
          {filteredCryptoData.map((crypto: any) => (
            <tr key={crypto?.id}>
              <td>
                {crypto?.name}
              </td>
              <td>{crypto?.symbol}</td>
              <td>{crypto?.rank}</td>

              <td>${parseFloat(crypto?.price_usd).toFixed(2)}</td>
              <td>${parseFloat(crypto?.market_cap_usd).toLocaleString()}</td>
              <td>${parseFloat(crypto?.price_btc).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoTracker;
