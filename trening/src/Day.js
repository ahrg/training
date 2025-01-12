import React from 'react';

const Day = ({ 
  dayName, 
  exercises, 
  updateExercises, 
  addExercise, 
  removeExercise, 
  isEditing, 
  toggleEdit,
  displayName
}) => {
  return (
    <div>
      <h2>{displayName}</h2>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Reps / Sets</th>
            <th>RPE</th>
            <th>Comments</th>
            {isEditing && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr key={index}>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={exercise.Exercise}
                    onChange={(e) =>
                      updateExercises(dayName, index, e.target.value, 'Exercise')
                    }
                  />
                ) : (
                  exercise.Exercise
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={exercise.Sets}
                    onChange={(e) =>
                      updateExercises(dayName, index, e.target.value, 'Sets')
                    }
                  />
                ) : (
                  exercise.Sets
                )}
              </td>
              <td>
                <input
                  type="text"
                  value={exercise.Rpe}
                  onChange={(e) =>
                    updateExercises(dayName, index, e.target.value, 'Rpe')
                  }
                />
              </td>
              <td>
                <input type="text" placeholder="Comment" 
                value={exercise.Comment}
                onChange={(e) => 
                  updateExercises(dayName, index, e.target.value, 'Comment')
                }/>
              </td>
              {isEditing && (
                <td>
                  <button onClick={() => removeExercise(index)}>
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => addExercise(dayName)}>Add Exercise</button>
      <button onClick={() => toggleEdit(dayName)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default Day;
