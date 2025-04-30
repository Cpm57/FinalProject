import React from 'react';
import './HabitList.css';

function HabitList({ habits, removeHabit, toggleCompletion }) {
  return (
    <div className="habit-list">
      {habits.length === 0 ? (
        <p>No habits to show. Add a new habit to get started!</p>
      ) : (
        habits.map((habit, index) => (
          <div
            key={index}
            className={`habit-item ${habit.completed ? 'completed' : ''}`}
            onClick={() => toggleCompletion(index)}
          >
            <div className="habit-info">
              <span className={`habit-name ${habit.completed ? 'completed-text' : ''}`}>
                {habit.completed ? '✔️ ' : ''} {habit.name}
              </span>
            </div>
            <button 
              className="remove-btn" 
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Are you sure you want to remove this habit?")) {
                  removeHabit(index);
                }
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default HabitList;

