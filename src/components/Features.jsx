import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { month: "Jan", income: 12000 },
  { month: "Feb", income: 18000 },
  { month: "Mar", income: 15000 },
  { month: "Apr", income: 20000 },
  { month: "May", income: 22000 },
  { month: "Jun", income: 17000 },
];

const Features = () => {
  // Calculator States
  const [display, setDisplay] = useState("0");
  const [firstNum, setFirstNum] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNum, setWaitingForSecondNum] = useState(false);

  const handleNumber = (num) => {
    if (display === "0" || waitingForSecondNum) {
      setDisplay(num);
      setWaitingForSecondNum(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    if (firstNum === null) {
      setFirstNum(parseFloat(display));
    } else if (operator) {
      const result = calculate(firstNum, parseFloat(display), operator);
      setFirstNum(result);
      setDisplay(result.toString());
    }
    setOperator(op);
    setWaitingForSecondNum(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (operator && firstNum !== null) {
      const result = calculate(firstNum, parseFloat(display), operator);
      setDisplay(result.toString());
      setFirstNum(null);
      setOperator(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNum(null);
    setOperator(null);
    setWaitingForSecondNum(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6">Quick Tools</h1>

      {/* Calculator */}
      <div className="max-w-xs mx-auto bg-gray-900 text-white rounded-2xl shadow-lg p-4 mb-10">
        <div className="bg-black text-right text-3xl p-4 rounded-xl mb-4">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={handleClear}
            className="col-span-2 bg-gray-600 hover:bg-gray-500 py-3 rounded-xl"
          >
            AC
          </button>
          <button
            onClick={() => handleOperator("/")}
            className="bg-yellow-500 hover:bg-yellow-400 py-3 rounded-xl"
          >
            ÷
          </button>
          <button
            onClick={() => handleOperator("*")}
            className="bg-yellow-500 hover:bg-yellow-400 py-3 rounded-xl"
          >
            ×
          </button>

          {[7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(n.toString())}
              className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOperator("-")}
            className="bg-yellow-500 hover:bg-yellow-400 py-3 rounded-xl"
          >
            −
          </button>

          {[4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(n.toString())}
              className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOperator("+")}
            className="bg-yellow-500 hover:bg-yellow-400 py-3 rounded-xl"
          >
            +
          </button>

          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(n.toString())}
              className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleEqual}
            className="row-span-2 bg-yellow-500 hover:bg-yellow-400 py-3 rounded-xl"
          >
            =
          </button>

          <button
            onClick={() => handleNumber("0")}
            className="col-span-2 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl"
          >
            0
          </button>
          <button
            onClick={() => handleNumber(".")}
            className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl"
          >
            .
          </button>
        </div>
      </div>

      {/* Income Graph */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Income Summary
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleData}>
            <Line type="monotone" dataKey="income" stroke="#2563eb" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Features;
