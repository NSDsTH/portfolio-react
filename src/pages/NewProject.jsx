import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProjects from '../store/useProjects'

export default function NewProject(){
  const [title, setTitle] = useState('')
  const { addProject } = useProjects()
  const nav = useNavigate()

  const onCreate = (e) => {
    e.preventDefault()
    const proj = addProject(title.trim() || 'Untitled')
    nav(`/projects/${proj.slug}`)
  }

  return (
    <section className="section">
      <div className="container" style={{maxWidth:640}}>
        <h2 className="section-title">New Project</h2>
        <form className="form" onSubmit={onCreate}>
          <div className="form__row">
            <label>Project title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="เช่น Build Model Linear Regression" />
          </div>
          <button className="btn btn--brand" type="submit">Create & Open</button>
        </form>
      </div>
    </section>
  )
}
