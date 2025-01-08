import React from 'react';

const WorkoutNavbar = ({ days, setSelectedDay }) => {
  return (
    <nav style={styles.navbar}>
      {days.map((day, index) => (
        <button 
          key={day} 
          style={styles.navButton}
          onClick={() => setSelectedDay(day)}
        >
          Day {index + 1}
        </button>
      ))}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    gap: '10px',
    background: '#f8f9fa',
    borderBottom: '1px solid #ddd',
  },
  navButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    background: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default WorkoutNavbar;
