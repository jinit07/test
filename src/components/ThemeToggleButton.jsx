import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggleButton = ({ toggleTheme, isDarkMode }) => {
    return (
        <button
            onClick={toggleTheme}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '50%',
                position: 'fixed', top: '1rem', left: '83rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
            }}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <FaSun style={{ color: '#FFD700', fontSize: '24px' }} />
            ) : (
                <FaMoon style={{ color: '#FFD700', fontSize: '24px' }} />
            )}
        </button>
    );
};

export default ThemeToggleButton;
