import React from "react";
import "./ExpenseFilter.css";

const ExpenseFilter = ({ selectedYear, onChangeFilter }) => {
  const dropdownChangeHandler = (e) => {
    onChangeFilter(e.target.value);
  };

  return (
    <div className="expense-filter">
      <label>Filter by year</label>
      <select value={selectedYear} onChange={dropdownChangeHandler}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
    </div>
  );
};

export default ExpenseFilter;
