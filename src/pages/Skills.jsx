import React from 'react'

const items = [
  { title:'UI Development', desc:'React/Next.js + modern CSS. Focus on UX, speed & accessibility.' },
  { title:'Backend & APIs', desc:'Node, Express, SQL. JWT auth, clean REST, deployment ready.' },
  { title:'Data & AI', desc:'RAG, vector DB (Qdrant), small models that solve real problems.' },
  { title:'Automation', desc:'Dashboards, scripts, CI—turn repeating work into one-click ops.' },
]

export default function Skills(){
  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">What I Do</h2>
        <div className="cards">
          {items.map((it)=>(
            <div className="card" key={it.title}>
              <div className="icon-box">💡</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
