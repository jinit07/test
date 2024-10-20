// src/components/MonthlyExpense.js
import React, { useState, useEffect } from 'react';

const MonthlyExpense = () => {
  const [formData, setFormData] = useState({
    staffExpense: '',
    rentExpense: '',
    interestRate: '',
    rawMaterials: '',
    additionalExpenses: '',
  });

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('monthlyExpenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalExpense = () => {
    const {
      staffExpense,
      rentExpense,
      interestRate,
      rawMaterials,
      additionalExpenses,
    } = formData;

    const total =
      parseFloat(staffExpense || 0) +
      parseFloat(rentExpense || 0) +
      parseFloat(rawMaterials || 0) +
      parseFloat(additionalExpenses || 0);

    const interest = (total * (parseFloat(interestRate) || 0)) / 100;
    return total + interest;
  };

  const onSubmit = () => {
    const totalExpense = calculateTotalExpense();
    const newExpense = { ...formData, totalExpense };
    const updatedExpenses = [...expenses, newExpense];

    setExpenses(updatedExpenses);
    localStorage.setItem('monthlyExpenses', JSON.stringify(updatedExpenses));

    setFormData({
      staffExpense: '',
      rentExpense: '',
      interestRate: '',
      rawMaterials: '',
      additionalExpenses: '',
    });
  };

  const onEdit = (index) => {
    const expenseToEdit = expenses[index];
    setFormData(expenseToEdit);
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    localStorage.setItem('monthlyExpenses', JSON.stringify(updatedExpenses));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Monthly Expense Tracker for Cafe/Restaurant</h1>
      <div className="grid gap-4">
        <input
          type="number"
          name="staffExpense"
          placeholder="Staff Expense"
          value={formData.staffExpense}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="rentExpense"
          placeholder="Rent Expense"
          value={formData.rentExpense}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate (%)"
          value={formData.interestRate}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="rawMaterials"
          placeholder="Raw Materials Expense"
          value={formData.rawMaterials}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="additionalExpenses"
          placeholder="Additional Expenses"
          value={formData.additionalExpenses}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <button onClick={onSubmit} className="bg-blue-500 text-white py-2 rounded">
          Save Expense
        </button>
      </div>

      <h2 className="text-xl font-bold mt-6">Saved Expenses</h2>
      <ul className="mt-4">
        {expenses.map((expense, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span>
              Staff: {expense.staffExpense}, Rent: {expense.rentExpense}, Interest Rate: {expense.interestRate}%, Raw Materials: {expense.rawMaterials}, Additional: {expense.additionalExpenses}, Total: ₹{expense.totalExpense}
            </span>
            <button
              onClick={() => onEdit(index)}
              className="bg-yellow-500 text-white py-1 px-3 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyExpense;
