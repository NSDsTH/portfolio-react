import React from 'react'

const projects = [
  { title:'Portfolio UI', desc:'Figma → React/Vite with clean tokens.', tags:['React','CSS'] },
  { title:'OEE Dashboard', desc:'Realtime KPIs for factory lines.', tags:['Charts','SQL'] },
  { title:'RAG Chatbot', desc:'Qwen + Qdrant, internal knowledge.', tags:['LLM','VectorDB'] },
  { title:'Defect Monitor', desc:'Next.js widget set with filters.', tags:['Next.js','UI'] },
  { title:'Computer Vision', desc:'Pose/Action recognition pipeline.', tags:['CV','Py'] },
  { title:'Automation Pack', desc:'Scripts & bots for ops.', tags:['Node','Ops'] },
]

export default function Projects(){
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <div className="filters">
          <button className="filter active">All</button>
          <button className="filter">Web</button>
          <button className="filter">AI</button>
          <button className="filter">Design</button>
        </div>

        <div className="project-grid">
          {projects.map(p=>(
            <article className="project-card" key={p.title}>
              <div className="project-card__img"></div>
              <div className="project-card__body">
                <h3>{p.title}</h3>
                <p style={{color:'var(--muted)'}}>{p.desc}</p>
                <div className="tags">
                  {p.tags.map(t=> <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
