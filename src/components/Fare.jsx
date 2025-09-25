import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";

const initialData = {
  daily: 1200,
  monthly: 35000,
  yearly: 420000,
  total: 500000,
};

const Fare = () => {
  const navigate = useNavigate();

  const [earnings, setEarnings] = useState(initialData);
  const [showTransactions, setShowTransactions] = useState(false);
  const [dailyEntries, setDailyEntries] = useState([
    { date: "2025-09-24", amount: 500 },
    { date: "2025-09-23", amount: 700 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [editTransactionIdx, setEditTransactionIdx] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  const cards = [
    { id: "daily", title: "Daily Income" },
    { id: "monthly", title: "Monthly Income" },
    { id: "yearly", title: "Yearly Income" },
    { id: "total", title: "Total Earnings" },
  ];

  // Open Add Modal
  const handleAddDailyOpen = () => setShowAddModal(true);

  // Add new daily income
  const handleAddDailySave = () => {
    if (!newAmount) return;

    const today = new Date().toISOString().split("T")[0];
    const updatedEntries = [...dailyEntries, { date: today, amount: Number(newAmount) }];
    setDailyEntries(updatedEntries);

    setEarnings({
      ...earnings,
      daily: earnings.daily + Number(newAmount),
      total: earnings.total + Number(newAmount),
    });

    setNewAmount("");
    setShowAddModal(false);
  };

  // Open transactions view
  const handleViewTransactions = () => setShowTransactions(true);

  // Delete a transaction
  const handleDeleteTransaction = (idx) => {
    const entryAmount = dailyEntries[idx].amount;
    const updatedEntries = dailyEntries.filter((_, i) => i !== idx);
    setDailyEntries(updatedEntries);

    setEarnings({
      ...earnings,
      daily: earnings.daily - entryAmount,
      total: earnings.total - entryAmount,
    });
  };

  // Edit a transaction
  const handleEditTransaction = (idx) => {
    setEditTransactionIdx(idx);
    setEditAmount(dailyEntries[idx].amount);
  };

  // Save edited transaction
  const handleSaveTransaction = () => {
    const updatedEntries = [...dailyEntries];
    const diff = editAmount - updatedEntries[editTransactionIdx].amount;
    updatedEntries[editTransactionIdx].amount = Number(editAmount);
    setDailyEntries(updatedEntries);

    setEarnings({
      ...earnings,
      daily: earnings.daily + diff,
      total: earnings.total + diff,
    });

    setEditTransactionIdx(null);
    setEditAmount("");
  };

  return (
    <div className="relative min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">CashFlow 💸</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
            <p className="text-2xl font-bold mb-4">₹ {earnings[card.id]}</p>

            {/* Buttons */}
            <div className="flex justify-between mt-auto gap-2">
              <button
                onClick={handleViewTransactions}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
              >
                View
              </button>
              {card.id === "daily" && (
                <button
                  onClick={handleAddDailyOpen}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Daily Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Add Daily Income</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Date</label>
              <input
                type="text"
                value={new Date().toISOString().split("T")[0]}
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Amount</label>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDailySave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions */}
      {showTransactions && (
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg relative">
          {/* Close cross button */}
          <button
            onClick={() => setShowTransactions(false)}
            className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-4">All Daily Transactions</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Date</th>
                <th className="border-b p-2 text-left">Amount</th>
                <th className="border-b p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailyEntries.map((entry, idx) => (
                <tr key={idx}>
                  <td className="border-b p-2">{entry.date}</td>
                  <td className="border-b p-2">₹ {entry.amount}</td>
                  <td className="border-b p-2 flex gap-2">
                    {editTransactionIdx === idx ? (
                      <>
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-20 p-1 border border-gray-300 rounded"
                        />
                        <button
                          onClick={handleSaveTransaction}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditTransactionIdx(null)}
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditTransaction(idx)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTransaction(idx)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Nested route outlet */}
      <Outlet />

      {/* Floating Icon to navigate to extra features */}
      <button
        onClick={() => navigate("features")}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center z-50"
      >
        <AiFillInfoCircle />
      </button>
    </div>
  );
};

export default Fare;
