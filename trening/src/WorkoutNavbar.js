import React from 'react';
import './NavBar.css'

const WorkoutNavbar = ({ days, setSelectedDay }) => {
  return (
    <nav className="WorkoutNavBar">
      {days.map((day, index) => (
        <button 
          key={day} 
          className="WorkoutNavButton"
          onClick={() => setSelectedDay(day)}
        >
          Day {index + 1}
        </button>
      ))}
    </nav>
  );
};


export default WorkoutNavbar;
