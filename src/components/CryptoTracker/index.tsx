import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CryptoTracker.css";
import CoinChart from '../CoinCharts'; 


const CryptoTracker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; 
  const [selectedCoin, setSelectedCoin] = useState<any | null>(null); 

  const handleCoinClick = (coin: any) => {
    setSelectedCoin(coin);
  };

  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

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
    <div className='table-container'>
     
      <center >
        <h2>Cryptocurrency Tracker</h2>
        <input
          className='search-bar'
          type="text"
          placeholder="Search Coin"
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
            <tr key={crypto?.id} onClick={() => handleCoinClick(crypto)}>
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

      {selectedCoin && (
        <CoinChart isOpen={!!selectedCoin} onClose={handleCloseModal} coinData={selectedCoin} />
      )}
    </div>
  );
};

export default CryptoTracker;
