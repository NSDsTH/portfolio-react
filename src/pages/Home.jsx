import React from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="grid-bg"></div>
      <div className="container hero__inner">
        <span className="kicker">Software Engineer • AI • Web</span>
        <div className="avatar" />
        <h1>Burathat Niamsomdee</h1>
        <p className="sub">
          I design and build clean, fast and accessible web apps. I also
          integrate practical AI features that actually help users.
        </p>
        <div className="cta">
          <a className="btn btn--brand" onClick={() => navigate("/projects")}>
            View Projects
          </a>
          <a className="btn btn--ghost" onClick={() => navigate("/contact")}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
