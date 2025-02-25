import React, { useState } from 'react';
import './App.css';
import './Status.css'

const Status = ({ setSelectedDay }) => {
  const [workoutDays, setWorkoutDays] = useState([
    { day: 1, focus: 'Handstand', status: 'Pending' },
    { day: 2, focus: 'Rest', status: 'Pending' },
    { day: 3, focus: 'Pulling Strength', status: 'Pending' },
    { day: 4, focus: 'Rest', status: 'Pending' },
    { day: 5, focus: 'Handstand Strength', status: 'Pending' },
    { day: 6, focus: 'Rest', status: 'Pending' },
    { day: 7, focus: 'Optional Handstand', status: 'Pending' },
  ]);
  

  const handleCheckboxChange = (index) => {
    const updatedDays = [...workoutDays];
    updatedDays[index].status = updatedDays[index].status === 'Pending'
      ? 'Completed'
      : 'Pending'; 
    setWorkoutDays(updatedDays); 
  };


  const handleFocusChange = (index, newFocus) => {
    const updatedDays = [...workoutDays]; 
    updatedDays[index].focus = newFocus; 
    setWorkoutDays(updatedDays); 
  };

  const toggleEdit = (index) => {
    const updatedDays = [...workoutDays];
    updatedDays[index].isEditing = !updatedDays[index].isEditing; 
    setWorkoutDays(updatedDays);
  };

  return (
<div>

  <div className="status-container">
    <main className="status-main color">
      <div className="status-table" role="table">

        <div className="status-row-t status-header" role="row">
          <div className="status-cell status-day" role="columnheader">Day</div>
          <div className="status-cell status-focus" role="columnheader">Focus</div>
          <div className="status-cell status-status" role="columnheader">Status</div>
          <div className="status-cell status-action" role="columnheader">Action</div>
        </div>

      
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
