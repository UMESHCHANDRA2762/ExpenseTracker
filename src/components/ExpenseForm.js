import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense, editingExpense, onSaveEditedExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState('monthly'); // Default to monthly

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setDate(editingExpense.date);
      setCategory(editingExpense.category || '');
      setIsRecurring(editingExpense.isRecurring || false);
      setRecurrenceFrequency(editingExpense.recurrenceFrequency || 'monthly');
    }
  }, [editingExpense]);

  const submitHandler = (e) => {
    e.preventDefault();
  
    const newExpense = {
      id: editingExpense ? editingExpense.id : Math.random().toString(),
      title,
      amount: parseFloat(amount).toFixed(2), // Round to 2 decimal places
      date,
      category,
      isRecurring,
      recurrenceFrequency,
    };
  
    if (editingExpense) {
      onSaveEditedExpense(newExpense);
    } else {
      onAddExpense(newExpense);
    }
  
    // If recurring, generate future expenses
    if (isRecurring) {
      generateRecurringExpenses(newExpense);
    }
  
    // Reset the form fields
    setTitle('');
    setAmount('');
    setDate('');
    setCategory('');
    setIsRecurring(false);
    setRecurrenceFrequency('monthly');
  };
  

  const generateRecurringExpenses = (expense) => {
    const futureExpenses = [];
    const now = new Date(expense.date);
    const monthsToGenerate = 12; // Generate for the next 12 months

    for (let i = 1; i <= monthsToGenerate; i++) {
      const futureDate = new Date(now);

      if (expense.recurrenceFrequency === 'monthly') {
        futureDate.setMonth(now.getMonth() + i);
      } else if (expense.recurrenceFrequency === 'weekly') {
        futureDate.setDate(now.getDate() + i * 7);
      }

      futureExpenses.push({
        ...expense,
        id: Math.random().toString(),
        date: futureDate.toISOString().split('T')[0],
      });
    }

    futureExpenses.forEach((futureExpense) => onAddExpense(futureExpense));
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

        <div className="form-control">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-control">
          <label>
            Recurring:
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            />
          </label>
        </div>

        {isRecurring && (
          <div className="form-control">
            <label>Recurrence Frequency</label>
            <select
              value={recurrenceFrequency}
              onChange={(e) => setRecurrenceFrequency(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}
      </div>

      <button type="submit">
        {editingExpense ? 'Save Changes' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
