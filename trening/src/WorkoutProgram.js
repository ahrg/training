import React, { useState } from 'react';
import './WorkoutProgram.css';

const WorkoutProgram = () => {
  const [currentDay, setCurrentDay] = useState(null);
  const [workoutData, setWorkoutData] = useState({
    'day1': {
      name: 'Day 1',
      focus: 'Handstand',
      status: 'Pending',
      exercises: [
        { 
          id: 'ex1_1', 
          name: 'Knebøy',
          setsReps: '3 x 8',
          sets: [
            { id: 'set1_1_1', weight: '80', reps: '8', rest: '180', rpe: '', comment: '' },
            { id: 'set1_1_2', weight: '80', reps: '8', rest: '180', rpe: '', comment: '' },
            { id: 'set1_1_3', weight: '80', reps: '8', rest: '180', rpe: '', comment: '' }
          ]
        },
        { 
          id: 'ex1_2', 
          name: 'Benk',
          setsReps: '3 x 10',
          sets: [
            { id: 'set1_2_1', weight: '60', reps: '10', rest: '120', rpe: '', comment: '' },
            { id: 'set1_2_2', weight: '60', reps: '10', rest: '120', rpe: '', comment: '' },
            { id: 'set1_2_3', weight: '60', reps: '10', rest: '120', rpe: '', comment: '' }
          ]
        }
      ]
    },
    'day2': {
      name: 'Day 2',
      focus: 'Rest',
      status: 'Pending',
      exercises: []
    },
    'day3': {
      name: 'Day 3',
      focus: 'Pulling Strength',
      status: 'Pending',
      exercises: [
        { 
          id: 'ex3_1', 
          name: 'Markløft',
          setsReps: '3 x 5',
          sets: [
            { id: 'set3_1_1', weight: '100', reps: '5', rest: '240', rpe: '', comment: '' },
            { id: 'set3_1_2', weight: '100', reps: '5', rest: '240', rpe: '', comment: '' },
            { id: 'set3_1_3', weight: '100', reps: '5', rest: '240', rpe: '', comment: '' }
          ]
        },
        { 
          id: 'ex3_2', 
          name: 'Pull-ups',
          setsReps: '3 x 6',
          sets: [
            { id: 'set3_2_1', weight: '0', reps: '6', rest: '120', rpe: '', comment: '' },
            { id: 'set3_2_2', weight: '0', reps: '6', rest: '120', rpe: '', comment: '' },
            { id: 'set3_2_3', weight: '0', reps: '6', rest: '120', rpe: '', comment: '' }
          ]
        }
      ]
    },
    'day4': {
      name: 'Day 4',
      focus: 'Rest',
      status: 'Pending',
      exercises: []
    },
    'day5': {
      name: 'Day 5',
      focus: 'Handstand Strength',
      status: 'Pending',
      exercises: [
        { 
          id: 'ex5_1', 
          name: 'Handstand Push-ups',
          setsReps: '3 x 5',
          sets: [
            { id: 'set5_1_1', weight: '0', reps: '5', rest: '180', rpe: '', comment: '' },
            { id: 'set5_1_2', weight: '0', reps: '5', rest: '180', rpe: '', comment: '' },
            { id: 'set5_1_3', weight: '0', reps: '5', rest: '180', rpe: '', comment: '' }
          ]
        },
        { 
          id: 'ex5_2', 
          name: 'Hollow Body Hold',
          setsReps: '3 x 30s',
          sets: [
            { id: 'set5_2_1', weight: '0', reps: '30', rest: '90', rpe: '', comment: '' },
            { id: 'set5_2_2', weight: '0', reps: '30', rest: '90', rpe: '', comment: '' },
            { id: 'set5_2_3', weight: '0', reps: '30', rest: '90', rpe: '', comment: '' }
          ]
        }
      ]
    },
    'day6': {
      name: 'Day 6',
      focus: 'Rest',
      status: 'Pending',
      exercises: []
    },
    'day7': {
      name: 'Day 7',
      focus: 'Optional Handstand',
      status: 'Pending',
      exercises: [
        { 
          id: 'ex7_1', 
          name: 'Wall Handstand',
          setsReps: '3 x 60s',
          sets: [
            { id: 'set7_1_1', weight: '0', reps: '60', rest: '120', rpe: '', comment: '' },
            { id: 'set7_1_2', weight: '0', reps: '60', rest: '120', rpe: '', comment: '' },
            { id: 'set7_1_3', weight: '0', reps: '60', rest: '120', rpe: '', comment: '' }
          ]
        }
      ]
    }
  });

  const handleSelectDay = (dayId) => {
    setCurrentDay(dayId);
  };

  const handleEditDay = (dayId) => {
    const day = workoutData[dayId];
    const newFocus = prompt('Endre fokus for dag:', day.focus);
    if (newFocus && newFocus.trim()) {
      setWorkoutData(prev => ({
        ...prev,
        [dayId]: {
          ...prev[dayId],
          focus: newFocus.trim()
        }
      }));
    }
  };

  const handleUpdateExerciseName = (exerciseId, newName) => {
    setWorkoutData(prev => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        exercises: prev[currentDay].exercises.map(ex => 
          ex.id === exerciseId ? { ...ex, name: newName } : ex
        )
      }
    }));
  };

  const handleUpdateSet = (exerciseId, setId, field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        exercises: prev[currentDay].exercises.map(ex => 
          ex.id === exerciseId 
            ? {
                ...ex,
                sets: ex.sets.map(set => 
                  set.id === setId ? { ...set, [field]: value } : set
                )
              }
            : ex
        )
      }
    }));
  };

  const handleAddExercise = () => {
    const exerciseName = prompt('Navn på ny øvelse:');
    if (!exerciseName || !exerciseName.trim()) return;
    
    const sets = prompt('Antall sett (f.eks. 3):');
    const reps = prompt('Antall reps (f.eks. 8):');
    
    if (!sets || !reps) return;
    
    const exerciseId = Date.now().toString();
    const newExercise = {
      id: exerciseId,
      name: exerciseName.trim(),
      setsReps: `${sets} x ${reps}`,
      sets: []
    };
    
    // Create sets
    for (let i = 0; i < parseInt(sets); i++) {
      newExercise.sets.push({
        id: `set_${exerciseId}_${i}`,
        weight: '0',
        reps: reps,
        rest: '120',
        rpe: '',
        comment: ''
      });
    }
    
    setWorkoutData(prev => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        exercises: [...prev[currentDay].exercises, newExercise]
      }
    }));
  };

  const handleEditExercise = (exerciseId) => {
    const exercise = workoutData[currentDay].exercises.find(ex => ex.id === exerciseId);
    const newSetsReps = prompt('Endre sett x reps:', exercise.setsReps);
    if (newSetsReps && newSetsReps.trim()) {
      setWorkoutData(prev => ({
        ...prev,
        [currentDay]: {
          ...prev[currentDay],
          exercises: prev[currentDay].exercises.map(ex => 
            ex.id === exerciseId ? { ...ex, setsReps: newSetsReps.trim() } : ex
          )
        }
      }));
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    if (window.confirm('Er du sikker på at du vil slette denne øvelsen?')) {
      setWorkoutData(prev => ({
        ...prev,
        [currentDay]: {
          ...prev[currentDay],
          exercises: prev[currentDay].exercises.filter(ex => ex.id !== exerciseId)
        }
      }));
    }
  };



  return (
    <div className="container">
      {/* Schedule Table */}
      <div className="schedule-table">
        <div className="schedule-header">
          <div>Day</div>
          <div>Focus</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        <div className="schedule-list">
          {Object.keys(workoutData).map(dayId => (
            <div 
              key={dayId}
              className={`schedule-row ${currentDay === dayId ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'BUTTON') {
                  handleSelectDay(dayId);
                }
              }}
            >
              <div className="day-number">{workoutData[dayId].name.replace('Day ', '')}</div>
              <div className="day-focus">{workoutData[dayId].focus}</div>
              <div>
                <span className={`status-badge ${workoutData[dayId].status === 'Completed' ? 'completed' : ''}`}>
                  {workoutData[dayId].status}
                </span>
              </div>
              <div>
                <button className="btn btn-small" onClick={() => handleEditDay(dayId)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Detail */}
      <div className="workout-detail">
        {!currentDay ? (
          <div className="empty-state">
            <h3>Velg en dag for å se treningsdetaljene</h3>
            <p>Klikk på en dag i tabellen ovenfor for å begynne.</p>
          </div>
        ) : (
          <div className="workout-content">
            <div className="workout-header">
              <div className="workout-title">{workoutData[currentDay].name}</div>
              <button className="btn add-exercise-btn" onClick={handleAddExercise}>Add Exercise</button>
            </div>
            
            <div className="exercise-header">
              <div>Exercise</div>
              <div>Reps / Sets</div>
              <div>RPE</div>
              <div>Comments</div>
              <div>Actions</div>
            </div>
            
            <div className="exercises-list">
              {workoutData[currentDay].exercises.map(exercise => (
                <div key={exercise.id} className="exercise-row">
                  <div>
                    <input 
                      type="text" 
                      className="exercise-name editable" 
                      value={exercise.name}
                      onChange={(e) => handleUpdateExerciseName(exercise.id, e.target.value)}
                    />
                  </div>
                  <div className="sets-reps">{exercise.setsReps}</div>
                  <div className="rpe-inputs">
                    {exercise.sets.map((set, index) => (
                      <input 
                        key={set.id}
                        type="number" 
                        className="rpe-input" 
                        placeholder="RPE" 
                        min="6" 
                        max="10"
                        value={set.rpe}
                        onChange={(e) => handleUpdateSet(exercise.id, set.id, 'rpe', e.target.value)}
                      />
                    ))}
                  </div>
                  <div className="comments-inputs">
                    {exercise.sets.map((set, index) => (
                      <input 
                        key={set.id}
                        type="text" 
                        className="comment-input" 
                        placeholder="Comment"
                        value={set.comment}
                        onChange={(e) => handleUpdateSet(exercise.id, set.id, 'comment', e.target.value)}
                      />
                    ))}
                  </div>
                  <div className="exercise-actions">
                    <button className="btn btn-small" onClick={() => handleEditExercise(exercise.id)}>Edit</button>
                    <button className="btn btn-small" onClick={() => handleRemoveExercise(exercise.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            

          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutProgram;