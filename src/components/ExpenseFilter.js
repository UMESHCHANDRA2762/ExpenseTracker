import React from "react";
import "./ExpenseFilter.css";

const ExpenseFilter = ({ selectedYear, selectedCategory, onFilterChange }) => {
  const yearChangeHandler = (e) => {
    onFilterChange({ year: e.target.value, category: selectedCategory });
  };

  const categoryChangeHandler = (e) => {
    onFilterChange({ year: selectedYear, category: e.target.value });
  };

  return (
    <div className="expense-filter">
      <div className="filter-control">
        <label>Filter by year</label>
        <select value={selectedYear} onChange={yearChangeHandler}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>

      <div className="filter-control"> {/* Category filter */}
        <label>Filter by category</label>
        <select value={selectedCategory} onChange={categoryChangeHandler}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
