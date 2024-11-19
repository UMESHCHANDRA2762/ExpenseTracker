import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null); // Track the expense being edited

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
  };

  const saveEditedExpenseHandler = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null); // Reset the editing state
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm
        onAddExpense={addExpenseHandler}
        editingExpense={editingExpense}
        onSaveEditedExpense={saveEditedExpenseHandler}
      />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpenseHandler}
        onEditExpense={editExpenseHandler}
      />
    </div>
  );
};

export default App;
