import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure this imports your updated app.css
import HabitList from './components/HabitList';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [selectedTab, setSelectedTab] = useState('daily');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the correct theme when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { name: newHabit.trim(), completed: false, frequency }]);
      setNewHabit('');
      setFrequency('daily');
    }
  };

  const removeHabit = (indexToRemove) => {
    setHabits(habits.filter((_, i) => i !== indexToRemove));
  };

  const toggleCompletion = (indexToToggle) => {
    setHabits(
      habits.map((habit, index) =>
        index === indexToToggle
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const filteredHabits = habits.filter(habit => habit.frequency === selectedTab);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="App">
      <h1>Welcome to the Habit Tracker</h1>

      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <div className="tabs">
        <button className={selectedTab === 'daily' ? 'active' : ''} onClick={() => setSelectedTab('daily')}>Daily</button>
        <button className={selectedTab === 'weekly' ? 'active' : ''} onClick={() => setSelectedTab('weekly')}>Weekly</button>
        <button className={selectedTab === 'monthly' ? 'active' : ''} onClick={() => setSelectedTab('monthly')}>Monthly</button>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={newHabit}
          placeholder="Enter new habit"
          onChange={(e) => setNewHabit(e.target.value)}
        />

        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <button onClick={addHabit}>Add Habit</button>
      </div>

      <HabitList
        habits={filteredHabits}
        removeHabit={removeHabit}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
}

export default App;
