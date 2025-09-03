import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__wrap container">
        <div className="nav__brand">Burathat</div>
        <nav className="nav__links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/skills">What I Do</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="nav__cta">
          <a className="btn btn--ghost" href="#contact">Hire me</a>
        </div>
      </div>
    </header>
  )
}
