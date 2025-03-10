import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  if (expenses.length === 0) {
    return <p className="no-expenses">No expenses found!</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-item">
          <div className="expense-date">{expense.date}</div>
          <div className="expense-details">
            <h2>{expense.title}</h2>
            <div className="expense-amount">${parseFloat(expense.amount).toFixed(2)}</div>
            {/* Display category for each expense */}
            <div className="expense-category">Category: {expense.category}</div>
          </div>
          <div className="expense-actions">
            {/* Edit button triggers onEditExpense function */}
            <button onClick={() => onEditExpense(expense)}>Edit</button>
            {/* Delete button triggers onDeleteExpense function */}
            <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
