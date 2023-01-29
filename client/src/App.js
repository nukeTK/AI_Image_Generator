import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
