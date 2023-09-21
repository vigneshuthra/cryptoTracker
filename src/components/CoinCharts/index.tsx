import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

interface CoinChartProps {
  isOpen: boolean;
  onClose: () => void;
  coinData: {
    name: string;
    percent_change_24h: string;
    percent_change_1h: string;
    percent_change_7d: string;
  };
}

const StyledModal = styled(Modal)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
`;

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  width: 100%; 
  max-width: 600px; 
  position: relative; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
`;

const CoinChart: React.FC<CoinChartProps> = ({ isOpen, onClose, coinData }) => {
  const chartData = [
    { name: '24h', value: parseFloat(coinData.percent_change_24h) },
    { name: '1h', value: parseFloat(coinData.percent_change_1h) },
    { name: '7d', value: parseFloat(coinData.percent_change_7d) },
  ];

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Price Chart Modal"
    >
      <ChartContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Price Change Chart for {coinData.name} in Percentage</h2>
        <LineChart width={600} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#1976D2" activeDot={{ r: 8 }} />
        </LineChart>
      </ChartContainer>
    </StyledModal>
  );
};

export default CoinChart;
