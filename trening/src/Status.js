import React, { useState } from 'react';
import './App.css';

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

      <main>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Focus</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workoutDays.map((day, index) => (
              <tr key={day.day}>
                {/* Day */}
                <td>{day.day}</td>

                <td onClick={() => setSelectedDay(`day${day.day}`)} style={{ cursor: 'pointer', color: 'blue' }}>
 
                  {day.isEditing ? (
                    <input
                      type="text"
                      value={day.focus}
                      onChange={(e) => handleFocusChange(index, e.target.value)}
                    />
                  ) : (
                    day.focus
                  )}
                </td>

                {/* Status */}
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={day.status === 'Completed'}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    {day.status}
                  </label>
                </td>

                {/* Edit Button */}
                <td>
                  <button onClick={() => toggleEdit(index)}>
                    {day.isEditing ? 'Save' : 'Edit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Status;
