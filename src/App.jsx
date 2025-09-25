import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Fare from "./components/Fare";
import Features from "./components/Features";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fare" element={<Fare />} />
        <Route path="/fare/features" element={<Features/>} />
      </Routes>
    </Router>
  );
}

export default App;
