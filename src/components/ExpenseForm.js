import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense, editingExpense, onSaveEditedExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const submitHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      id: editingExpense ? editingExpense.id : Math.random().toString(),
      title,
      amount,
      date,
    };

    if (editingExpense) {
      onSaveEditedExpense(newExpense); // Save the edited expense
    } else {
      onAddExpense(newExpense); // Add a new expense
    }

    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <form className="expense-form" onSubmit={submitHandler}>
      <div className="form-controls">
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">
        {editingExpense ? 'Save Changes' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
