import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Home, About, Skills, Projects, Contact } from "./pages";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
      </main>
      <Footer />
    </>
  );
}
