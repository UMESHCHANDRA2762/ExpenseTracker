import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // Import icons
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseChart from './components/ExpenseChart';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({ year: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleThemeHandler = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Expense Tracker</h1>

      {/* Theme Toggle Button as an Icon */}
      <button className="theme-toggle" onClick={toggleThemeHandler}>
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <ExpenseForm 
        onAddExpense={setExpenses} 
        editingExpense={editingExpense} 
        onSaveEditedExpense={setExpenses} 
      />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title, category, or amount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ExpenseFilter
        selectedYear={filter.year}
        selectedCategory={filter.category}
        onFilterChange={setFilter}
      />

      <ExpenseChart expenses={expenses} />
      <ExpenseList 
        expenses={expenses} 
        onDeleteExpense={(id) => setExpenses(expenses.filter(exp => exp.id !== id))}
        onEditExpense={setEditingExpense}
      />
    </div>
  );
};

export default App;
