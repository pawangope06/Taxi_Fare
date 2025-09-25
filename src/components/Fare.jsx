import React, { useState } from "react";

const initialData = {
  daily: 0,
  monthly: 0,
  yearly: 0,
  total: 0,
};

const Fare = () => {
  const [earnings, setEarnings] = useState(initialData);
  const [showTransactions, setShowTransactions] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [dailyEntries, setDailyEntries] = useState([
    { date: "2025-09-24", amount: 500 },
    { date: "2025-09-23", amount: 700 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAmount, setNewAmount] = useState("");

  const cards = [
    { id: "daily", title: "Daily Income" },
    { id: "monthly", title: "Monthly Income" },
    { id: "yearly", title: "Yearly Income" },
    { id: "total", title: "Total Earnings" },
  ];

  const handleView = () => {
    setShowTransactions(true);
    setEditCard(null);
  };

  const handleEdit = (card) => {
    setEditCard(card);
    setInputValue(earnings[card]);
    setShowTransactions(false);
  };

  const handleSave = () => {
    setEarnings({ ...earnings, [editCard]: Number(inputValue) });
    setEditCard(null);
  };

  const handleAddDailyOpen = () => {
    setShowAddModal(true);
  };

  const handleAddDailySave = () => {
    if (!newAmount) return;

    const today = new Date().toISOString().split("T")[0];
    const updatedEntries = [...dailyEntries, { date: today, amount: Number(newAmount) }];
    setDailyEntries(updatedEntries);

    // Update daily and total earnings
    setEarnings({
      ...earnings,
      daily: earnings.daily + Number(newAmount),
      total: earnings.total + Number(newAmount),
      monthly: earnings.total + Number(newAmount),
    });

    setNewAmount("");
    setShowAddModal(false);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewAmount("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Fare Dashboard</h1>

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
                onClick={handleView}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(card.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Edit
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

      {/* Edit Input */}
      {editCard && (
        <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Edit {cards.find((c) => c.id === editCard).title}
          </h2>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setEditCard(null)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      )}

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
                onClick={handleAddModalClose}
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
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Date</th>
                <th className="border-b p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dailyEntries.map((entry, idx) => (
                <tr key={idx}>
                  <td className="border-b p-2">{entry.date}</td>
                  <td className="border-b p-2">₹ {entry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Fare;
