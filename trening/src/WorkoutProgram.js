import React, { useState } from 'react';
import Day from './Day';
import WorkoutNavbar from './WorkoutNavbar';
import Status from './Status';

// Kommenter koden
// Sjekke ut og practice navbars


//    - Sørge for at den er responsiv for mobilvisning. 


const loadExercisesFromStorage = () => {
  const savedExercises = localStorage.getItem('workoutProgram');
  return savedExercises
    ? JSON.parse(savedExercises)
    : {
        day1: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '', Comment: '' }],
        day2: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '', Comment: '' }],
        day3: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '', Comment: '' }],
        day4: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '', Comment: '' }],
        day5: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '', Comment: '' }],
        day6: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '', Comment: '' }],
        day7: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '', Comment: '' }],
      };
};

const WorkoutProgram = () => {
  const [daysExercises, setDaysExercises] = useState(loadExercisesFromStorage);
  const [editingState, setEditingState] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
    day6: false,
    day7: false,
  });
  const [selectedDay, setSelectedDay] = useState('day1');

  const toggleEdit = (day) => {
    setEditingState((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const updateExercises = (day, index, value, key) => {
    const updatedExercises = [...daysExercises[day]];
    updatedExercises[index][key] = value;

    setDaysExercises((prevState) => {
      const updatedState = { ...prevState, [day]: updatedExercises };
      saveToLocalStorage(updatedState);
      return updatedState;
    });
  };

  const addExercise = (day) => {
    const updatedExercises = [...daysExercises[day]];
    const newExercise = { Exercise: '', Sets: '', Rpe: '', Comment: '' };
    updatedExercises.push(newExercise);

    setDaysExercises((prevState) => {
      const updatedState = { ...prevState, [day]: updatedExercises };
      saveToLocalStorage(updatedState);
      return updatedState;
    });
  };

  const removeExercise = (day, index) => {
    const updatedExercises = [...daysExercises[day]];
    updatedExercises.splice(index, 1);

    setDaysExercises((prevState) => {
      const updatedState = { ...prevState, [day]: updatedExercises };
      saveToLocalStorage(updatedState);
      return updatedState;
    });
  };

  const saveToLocalStorage = (updatedState) => {
    localStorage.setItem('workoutProgram', JSON.stringify(updatedState));
  };

  const sendToDiscordWithFile = async () => {
    const webhookURL = process.env.REACT_APP_WEBHOOK_URL;

  
    // Format workout data into a more readable structure
    let fileContent = '';
  
    // Add the header for the table
    fileContent += `Day                          Sets         RPE     Comment\n`;
    fileContent += `---------------------------------------------------------------\n`;
  
    // Iterate over each day and format its exercises
    Object.keys(daysExercises).forEach(day => {
      // Add day header (e.g., Day 1, Day 2)
      fileContent += `\n${day.toUpperCase().replace('DAY', 'Day ')}\n`;
      
      // Add exercises for that day, aligned in columns
      daysExercises[day].forEach((exercise, index) => {
        // Format each exercise's details into a structured line
        fileContent += `${exercise.Exercise.padEnd(30)} ${exercise.Sets.padEnd(12)} ${exercise.Rpe.padEnd(8)} ${exercise.Comment}\n`;
      });
      
      // Add a separator between days for clarity
      fileContent += `---------------------------------------------------------------\n`;
    });
  
    // Prepare the file as a Blob (plain text file)
    const formData = new FormData();
    formData.append('file', new Blob([fileContent], { type: 'text/plain' }), 'workout_data.txt');
  
    // Send the file via webhook
    try {
      const response = await fetch(webhookURL, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to send webhook');
      }
      console.log('Workout sent successfully!');
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  };

  const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];

  return (
    <div>
      <Status setSelectedDay={setSelectedDay} />
      <WorkoutNavbar days={days} setSelectedDay={setSelectedDay} />
      
      <main>
        <Day
          key={selectedDay}
          dayName={selectedDay}
          exercises={daysExercises[selectedDay]}
          updateExercises={updateExercises}
          addExercise={() => addExercise(selectedDay)}
          removeExercise={(index) => removeExercise(selectedDay, index)}
          isEditing={editingState[selectedDay]}
          toggleEdit={() => toggleEdit(selectedDay)}
          displayName={`Day ${days.indexOf(selectedDay) + 1}`}
        />
      </main>

      {/* Submit Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={sendToDiscordWithFile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#e63225',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit Workout to Discord
        </button>
      </div>
    </div>
  );
};

export default WorkoutProgram;
