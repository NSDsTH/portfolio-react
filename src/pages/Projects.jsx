import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import data from "../../public/data.json";

export default function Projects(){
  const projects = data;
  const nav = useNavigate()

  const handleFilterSection = (section) => {
    
  }

  useEffect(() => {
    console.log(projects);

  }, []);

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <div className="filters" style={{justifyContent:'space-between'}}>
          <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
            <button className="filter active">All</button>
            {/* <button className="filter">Web</button>
            <button className="filter">AI</button>
            <button className="filter">Design</button> */}
          </div>
          {/* <button className="btn btn--brand" onClick={()=> nav('/projects/new')}>+ Add Project</button> */}
        </div>

        <div className="project-grid">
          {projects.map(p=>(
            <Link className="project-card card--link" key={p.slug} to={`/projects/${p.slug}`}>
              <div className="project-card__img"></div>
              <div className="project-card__body">
                <h3>{p.title}</h3>
                <p style={{color:'var(--muted)'}}>{p.desc}</p>
                <div className="tags">
                  {p.tags?.map(t=> <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}