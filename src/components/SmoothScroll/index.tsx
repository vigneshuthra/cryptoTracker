import React from 'react';
import { Link } from 'react-scroll';
import CryptoTracker from '../CryptoTracker';



const SmoothScroll: React.FC = () => {
  return (
    <div>
      <nav className='navigation'>
        <a href='/' className='title'>
          Crypto-tracker
        </a>

        <button className="hamburger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className='navigation-menu'>
          <ul>
            <li>
              <Link to="section1" smooth={true} duration={500}>
                Section 1
              </Link>
            </li>
            <li>
              <Link to="section2" smooth={true} duration={500}>
                Tracker
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div id="section1" style={{ height: '800px', background: 'lightblue' }}>
        Section 1
      </div>
      <div id="section2" style={{ height: '800px', background: 'lightgreen' }}>
      <CryptoTracker />     
      </div>
    </div>
  );
};

export default SmoothScroll;
