import React, { useState } from 'react';
import './App.css';
import './Status.css'

const Status = ({ setSelectedDay }) => {
  // State for the workout program, defaulting to 'Pending' for every day
  const [workoutDays, setWorkoutDays] = useState([
    { day: 1, focus: 'Handstand', status: 'Pending' },
    { day: 2, focus: 'Rest', status: 'Pending' },
    { day: 3, focus: 'Pulling Strength', status: 'Pending' },
    { day: 4, focus: 'Rest', status: 'Pending' },
    { day: 5, focus: 'Handstand Strength', status: 'Pending' },
    { day: 6, focus: 'Rest', status: 'Pending' },
    { day: 7, focus: 'Optional Handstand', status: 'Pending' },
  ]);
  
  // Function to toggle the status between 'Pending' and 'Completed'
  const handleCheckboxChange = (index) => {
    const updatedDays = [...workoutDays]; // Copy current state
    updatedDays[index].status = updatedDays[index].status === 'Pending'
      ? 'Completed'
      : 'Pending'; // Toggle status
    setWorkoutDays(updatedDays); // Update state
  };

  // Function to update the focus (text input) dynamically
  const handleFocusChange = (index, newFocus) => {
    const updatedDays = [...workoutDays]; // Copy current state
    updatedDays[index].focus = newFocus; // Update focus for that day
    setWorkoutDays(updatedDays); // Update state
  };

  const toggleEdit = (index) => {
    const updatedDays = [...workoutDays];
    updatedDays[index].isEditing = !updatedDays[index].isEditing; // Toggle edit mode
    setWorkoutDays(updatedDays);
  };

  return (
<div>
  <header>
    <h1>My Workout Program</h1>
  </header>
  <div className="status-container">
    <main className="status-main color">
      <div className="status-table" role="table">
        {/* Header */}
        <div className="status-row-t status-header" role="row">
          <div className="status-cell status-day" role="columnheader">Day</div>
          <div className="status-cell status-focus" role="columnheader">Focus</div>
          <div className="status-cell status-status" role="columnheader">Status</div>
          <div className="status-cell status-action" role="columnheader">Action</div>
        </div>

        {/* Body */}
        {workoutDays.map((day, index) => (
          <div className="status-row" key={day.day} role="row">
            <div className="status-cell status-day" role="cell">{day.day}</div>
            
            <div className="status-cell status-focus" role="cell" onClick={() => setSelectedDay(`day${day.day}`)}>
              {day.isEditing ? (
                <input
                  type="text"
                  value={day.focus}
                  onChange={(e) => handleFocusChange(index, e.target.value)}
                  className="status-input"
                />
              ) : (
                day.focus
              )}
            </div>

            <div className="status-cell status-status" role="cell">
              <label>
                <input
                  type="checkbox"
                  className="cursor"
                  checked={day.status === "Completed"}
                  onChange={() => handleCheckboxChange(index)}
                />
                {day.status}
              </label>
            </div>

            <div className="status-cell status-action" role="cell">
              <button
                onClick={() => toggleEdit(index)}
                className="status-button"
              >
                {day.isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
</div>


  );
};

export default Status;
