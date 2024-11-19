import React from "react";
import "./ExpenseItem.css";

const ExpenseItem = ({ title, amount, date }) => {
  return (
    <li className="expense-item">
      <div className="expense-date">
        {date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="expense-details">
        <h2>{title}</h2>
        <div className="expense-amount">${amount.toFixed(2)}</div>
      </div>
    </li>
  );
};

export default ExpenseItem;
