import React from 'react';
import './Day.css';

const Day = ({ 
  dayData,
  isSelected,
  onSelect,
  onEdit,
  onUpdateExerciseName,
  onUpdateSet,
  onAddExercise,
  onEditExercise,
  onRemoveExercise
}) => {
  const handleRowClick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      onSelect();
    }
  };

  if (!isSelected) {
    // Schedule row view
    return (
      <div 
        className={`schedule-row ${isSelected ? 'active' : ''}`}
        onClick={handleRowClick}
      >
        <div className="day-number">{dayData.name.replace('Day ', '')}</div>
        <div className="day-focus">{dayData.focus}</div>
        <div>
          <span className={`status-badge ${dayData.status === 'Completed' ? 'completed' : ''}`}>
            {dayData.status}
          </span>
        </div>
        <div>
          <button className="btn btn-small" onClick={() => onEdit(dayData.name)}>
            Edit
          </button>
        </div>
      </div>
    );
  }

  // Detailed workout view
  return (
    <div className="workout-detail">
      <div className="workout-header">
        <div className="workout-title">{dayData.name}</div>
        <button className="btn add-exercise-btn" onClick={onAddExercise}>
          Add Exercise
        </button>
      </div>
      
      <div className="exercise-header">
        <div>Exercise</div>
        <div>Reps / Sets</div>
        <div>RPE</div>
        <div>Comments</div>
        <div>Actions</div>
      </div>
      
      <div className="exercises-list">
        {dayData.exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-row">
            <div>
              <input 
                type="text" 
                className="exercise-name editable" 
                value={exercise.name}
                onChange={(e) => onUpdateExerciseName(exercise.id, e.target.value)}
              />
            </div>
            <div className="sets-reps">{exercise.setsReps}</div>
            <div className="rpe-inputs">
              {exercise.sets.map((set) => (
                <input
                  key={set.id}
                  type="number"
                  className="rpe-input"
                  placeholder="RPE"
                  min="6"
                  max="10"
                  value={set.rpe}
                  onChange={(e) => onUpdateSet(exercise.id, set.id, 'rpe', e.target.value)}
                />
              ))}
            </div>
            <div className="comments-inputs">
              {exercise.sets.map((set) => (
                <input
                  key={set.id}
                  type="text"
                  className="comment-input"
                  placeholder="Comment"
                  value={set.comment}
                  onChange={(e) => onUpdateSet(exercise.id, set.id, 'comment', e.target.value)}
                />
              ))}
            </div>
            <div className="exercise-actions">
              <button 
                className="btn btn-small" 
                onClick={() => onEditExercise(exercise.id)}
              >
                Edit
              </button>
              <button 
                className="btn btn-small btn-danger" 
                onClick={() => onRemoveExercise(exercise.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;