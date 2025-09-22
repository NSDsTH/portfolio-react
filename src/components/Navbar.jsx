import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const KEY = "ui.theme"; // 'light' | 'dark'

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);
  return (
    <header className="nav">
      <div className="nav__wrap container">
        <div className="nav__brand">Burathat</div>
        <nav className="nav__links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/skills">What I Do</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="nav__cta">
          <a className="btn btn--ghost" href="#contact">
            Hire me
          </a>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            padding: "6px 10px",
            borderRadius: 10,
            border: `1px solid var(--border)`,
            background: "var(--card)",
            color: "var(--text)",
            cursor: "pointer",
          }}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
