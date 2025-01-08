import React, { useState, useEffect } from 'react';

const WorkoutProgram = () => {
  const [Exercise, setExercise] = useState ([
    { Exercise: 'Handstand', Sets: '3x3', Rpe: ''},
    { Exercise: 'Hspu', Sets: '3x3', Rpe: ''},
    { Exercise: 'Explosive Pullups', Sets: '3x3', Rpe: ''},
    { Exercise: 'Exercise fra fysio', Sets: '3x3', Rpe: ''},
    { Exercise: 'Exercise fra fysio', Sets: '3x3', Rpe: ''},
    { Exercise: 'Tuck front lever', Sets: '3x3', Rpe: ''},
    { Exercise: 'Pushups', Sets: '3x3', Rpe: ''},
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);  // Toggle the state
  };

return (
    <div>
      <header>
        <h1>DAY 1</h1>
      </header>
        <main>
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Reps / Sets</th>
              <th>RPE</th>
              <th>Comment</th>
            </tr>
            </thead>

            <tbody>
              {Exercise.map((exercise, index) => (
                <tr key={index}>
                  <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={exercise.Exercise}
                      onChange={(e) => {
                        const updatedExercises = [...Exercise];
                        updatedExercises[index].Exercise = e.target.value;
                        setExercise(updatedExercises);
                      }}
                    />
                  ) : (
                    exercise.Exercise
                  )}
                  </td>
                  <td>{exercise.Sets}</td>
                  <td>
                  <input
                    type="text"
                    value={exercise.Rpe} // RPE-verdi fra state
                    onChange={(e) => {
                      const updatedExercises = [...Exercise]; // Kopier arrayet
                      updatedExercises[index].Rpe = e.target.value; // Oppdater RPE for riktig øvelse
                      setExercise(updatedExercises); // Lagre endringer i state
                    }}
                  /></td>
                    <td>
                  <input type="text" placeholder="Comment"/>
                  </td>
                </tr>
              ))}

            
            </tbody>
          </table>
        </main>
        <button onClick={toggleEdit}>
          {isEditing ? 'Save' : 'Edit'}  {/* Toggle button text based on state */}
        </button>




    </div>
    )
};


export default WorkoutProgram;