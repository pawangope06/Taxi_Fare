import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/fare"); // Navigate to FareCalculator page
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-amber-200">
      <div className="flex flex-col items-center pt-16 px-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPmTcKCiSZxOn9HxJEi1MJcoiIjUQHMTPKqQ&s"
          className="rounded-full w-24 h-24 shadow-lg mb-4"
          alt="Logo"
        />
        <h1 className="text-3xl font-bold text-center mb-2">Taxi Fare</h1>
        <p className="text-gray-700 font-light text-center text-sm max-w-xs">
          Save your money and time with Taxi fare.
        </p>
      </div>

      <div className="flex justify-center mb-10 px-4">
        <button
          onClick={handleContinue}
          className="bg-blue-500 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-3xl shadow-lg transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Home;
