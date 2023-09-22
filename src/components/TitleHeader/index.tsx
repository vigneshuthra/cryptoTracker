import React from 'react';
import { Link } from 'react-scroll';
import CryptoTracker from '../CryptoTracker';
import "./TitleHeader.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';


const scrollToSection2 = () => {
  const section2 = document.querySelector('#section2');
  if (section2) {
    section2.scrollIntoView({ behavior: 'smooth' });
  }
};

const TitleHeader: React.FC = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className='nav-container'>

          <div className='logo'>
            <Link to='section1'>
              CryptoTracker</Link>
          </div>

          <div className='navigation-menu'>
            <ul>
              <li>
                <Link to="section1" smooth={true} duration={500}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="section2" smooth={true} duration={500}>
                  Tracker
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </nav>

      <div className='smooth-scroll-container'>

        <div className='section-1' id="section1" style={{ height: '800px', background: '#2c3034' }}>

          <div className='title' >Welcome to CryptoTracker</div>
          <div className='subtitle'>Track cryptocurrency prices in real-time  <FontAwesomeIcon icon={faRocket} beat /></div>
          <button className='scroll-button' onClick={scrollToSection2}>Go to the Tracker</button>

        </div>

        <div className='section-2' id="section2" style={{ height: '900px', background: 'gray' }}>
          <CryptoTracker />
        </div>

      </div>

    </div>
  );
};

export default TitleHeader;
