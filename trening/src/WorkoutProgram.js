import React, { useState } from 'react';
import Day from './Day';
import WorkoutNavbar from './WorkoutNavbar'
import Status from './Status'
// Kommenter koden
// Sjekke ut og practice navbars


// 3. Nye funksjoner: 
//    - Legge til en global navbar
//    - Legge til en submit-knapp som laster ned hele økten. 

// 4. Design og brukervennlighet: 
//    - Style nettsiden for bedre utseende. 
//    - Når jeg klikker på handstand (dag1) så scroller den også ned
//    - Sørge for at den er responsiv for mobilvisning. 


const loadExercisesFromStorage = () => {
  const savedExercises = localStorage.getItem('workoutProgram');
  return savedExercises
    ? JSON.parse(savedExercises)
    : {
        day1: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '' , Comment: ''}],
        day2: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '' , Comment: ''}],
        day3: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '' , Comment: ''}],
        day4: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '' , Comment: ''}],
        day5: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '' , Comment: ''}],
        day6: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '' , Comment: ''}],
        day7: [{ Exercise: 'Exercise', Sets: 'Sets:Reps', Rpe: '' , Comment: ''}],
      };
};

const WorkoutProgram = () => {
  // State for exercises
  const [daysExercises, setDaysExercises] = useState(loadExercisesFromStorage);

  // State to track editing
  const [editingState, setEditingState] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
    day6: false,
    day7: false,
  });

  // State to track the selected day
  const [selectedDay, setSelectedDay] = useState('day1'); // Default to day 1

  // Function to toggle edit mode
  const toggleEdit = (day) => {
    setEditingState((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  // Function to update exercises
  const updateExercises = (day, index, value, key) => {
    const updatedExercises = [...daysExercises[day]];
    updatedExercises[index][key] = value;

    setDaysExercises((prevState) => {
      const updatedState = { ...prevState, [day]: updatedExercises };
      saveToLocalStorage(updatedState);
      return updatedState;
    });
  };

  // Add new exercise
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

  // Remove an exercise
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

  // Days array
  const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];

  return (
    <div>

      {/* Add Navbar */}
      <Status setSelectedDay={setSelectedDay} />
      <WorkoutNavbar days={days} setSelectedDay={setSelectedDay} />
      
      <main>
        {/* Render only the selected day */}
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
    </div>
  );
};

export default WorkoutProgram;
