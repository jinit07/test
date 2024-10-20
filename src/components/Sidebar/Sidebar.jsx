// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isDarkMode }) => {
  const styles = {
    sideBar: {
      width: '14rem',
      height: '100%',
      padding: '2.1rem 1.2rem',
      backgroundColor: isDarkMode ? '#1E1E78' : '#f0f0f0',
      position: 'fixed',
      transition: 'all 0.5s ease',
      top: 0,
      left: 0,
      color: isDarkMode ? '#FFD700' : '#333',
      fontFamily: 'Arial, sans-serif',
    },
    logoNameWrapper: {
      marginBottom: '2.1rem',
      display: 'flex',
      fontSize: '1.5rem',
      alignItems: 'center',
    },
    logoName: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '50px',
      height: 'auto',
    },
    logoNameText: {
      marginLeft: '0.9rem',
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      color: isDarkMode ? '#FFD700' : '#333',
    },
    logoNameButton: {
      marginLeft: 'auto',
      fontSize: '1.8rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    dashboardItem: {
      padding: '1rem 0',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: isDarkMode ? '#b5b5be' : '#666',
    },
    mySalesItem: {
      padding: '1rem 0',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: isDarkMode ? '#b5b5be' : '#666',
    },
    monthlyExpenseItem: {
      padding: '1rem 0',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: isDarkMode ? '#b5b5be' : '#666',
    },
  };

  return (
    <div className="side-bar" style={styles.sideBar}>
      <div style={styles.logoNameWrapper}>
        <div style={styles.logoName}>
          <img
            src={`${process.env.PUBLIC_URL}/Syndicate Logo.png`}
            style={styles.logo}
            alt="logo app"
          />
          <span style={styles.logoNameText}>Syndicate</span>
        </div>
        <button style={styles.logoNameButton}>
          <i className="bx bx-arrow-from-right logo-name__icon" id="logo-name__icon"></i>
        </button>
      </div>

      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={styles.dashboardItem}>
          <i className="bx bxs-dashboard"></i>
          <span style={{ marginLeft: '0.5rem' }}>Dashboard</span>
        </div>
      </Link>

      <Link to="/mysales" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={styles.mySalesItem}>
          <i className="bx bxs-cart"></i>
          <span style={{ marginLeft: '0.5rem' }}>My Sales</span>
        </div>
      </Link>

      <Link to="/monthly-expense" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={styles.monthlyExpenseItem}>
          <i className="bx bxs-calendar"></i>
          <span style={{ marginLeft: '0.5rem' }}>Monthly Expenses</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
