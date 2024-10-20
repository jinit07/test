import React, { useState } from 'react';

const MySales = ({ isDarkMode }) => {
  const [date, setDate] = useState('');
  const [platform, setPlatform] = useState('Swiggy');
  const [previousSales, setPreviousSales] = useState(['', '']); // Two input fields for previous sales
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (index, value) => {
    const updatedSales = [...previousSales];
    updatedSales[index] = value;
    setPreviousSales(updatedSales);
  };

  const handlePredict = () => {
    const totalSales = previousSales.reduce((sum, sale) => (parseFloat(sale) || 0) + sum, 0);
    const predictedSale = (totalSales / previousSales.length) + 100; // Simple prediction logic
    setPrediction(predictedSale.toFixed(2));
  };

  const containerStyle = {
    padding: '2rem',
    backgroundColor: isDarkMode ? '#17171e' : '#f0f0f0',
    minHeight: '90vh',
    width: '70%',
    marginLeft: '16rem',
    borderRadius: '8px',
    boxShadow: isDarkMode ? '0 4px 10px rgba(0, 0, 0, 0.5)' : 'none',
  };

  const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1.5rem 0',
    backgroundColor: isDarkMode ? '#2c2c34' : '#ffffff',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: `1px solid ${isDarkMode ? '#ccc' : '#aaa'}`,
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: isDarkMode ? '#444' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: isDarkMode ? '#FFD700' : '#000',
    color: isDarkMode ? '#000' : '#FFD700',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '1rem',
  };

  const predictionStyle = {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: isDarkMode ? '#2c2c34' : '#f0f0f0',
    borderRadius: '8px',
    textAlign: 'center',
    color: isDarkMode ? '#FFD700' : '#000',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: isDarkMode ? '#FFD700' : '#000' }}>Sales Prediction</h2>
      <div style={boxStyle}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={boxStyle}>
        <label>Platform:</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          style={inputStyle}
        >
          <option value="Swiggy">Swiggy</option>
          <option value="Zomato">Zomato</option>
          {/* Add more platforms if needed */}
        </select>
      </div>
      <h3 style={{ color: isDarkMode ? '#FFD700' : '#000' }}>Previous Sales</h3>
      {previousSales.map((sale, index) => (
        <div style={boxStyle} key={index}>
          <label>Day {index + 1}:</label>
          <input
            type="number"
            value={sale}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Enter sales"
            style={inputStyle}
          />
        </div>
      ))}
      <button onClick={handlePredict} style={buttonStyle}>
        Predict
      </button>

      {prediction !== null && (
        <div style={predictionStyle}>
          <h4>Predicted Sale for Next Day:</h4>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default MySales;
