import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../store/useProjects'

const newId = () => Math.random().toString(36).slice(2,9)

function Block({ block, onChange, onToggle, onRemove }) {
  const ref = useRef(null)
  useEffect(()=> { if (!block._mounted && ref.current) ref.current.focus() }, [])

  const commonProps = {
    ref,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: e => onChange({ ...block, text: e.currentTarget.textContent }),
    className: 'block-input'
  }

  return (
    <div className={`block block-${block.type}`}>
      {block.type === 'h1' && <h1 {...commonProps}>{block.text}</h1>}
      {block.type === 'h2' && <h2 {...commonProps}>{block.text}</h2>}
      {block.type === 'p'  && <p  {...commonProps}>{block.text}</p>}
      {block.type === 'bullet' && (
        <div className="bullet-line">
          <span>•</span>
          <div {...commonProps} />
        </div>
      )}
      {block.type === 'todo' && (
        <div className="todo-line">
          <input type="checkbox" checked={!!block.checked} onChange={()=> onToggle({ ...block, checked: !block.checked })} />
          <div {...commonProps} />
        </div>
      )}
      {block.type === 'code' && (
        <pre className="code" contentEditable spellCheck={false}
             onInput={e => onChange({ ...block, text: e.currentTarget.textContent })}>
          {block.text}
        </pre>
      )}
      <div className="block-tools">
        <button onClick={()=> onRemove(block.id)} title="Delete">✕</button>
      </div>
    </div>
  )
}

export default function ProjectDetail(){
  const { slug } = useParams()
  const { getProject, updateProject } = useProjects()
  const project = getProject(slug)

  const [title, setTitle] = useState(project?.title || '')
  const [desc, setDesc]     = useState(project?.desc  || '')
  const [blocks, setBlocks] = useState(project?.content || [])

  useEffect(()=> {
    if (!project) return
    setTitle(project.title); setDesc(project.desc); setBlocks(project.content || [])
  }, [slug]) // load when slug changes

  // autosave (debounce 500ms)
  useEffect(()=> {
    const t = setTimeout(()=> {
      if (!project) return
      updateProject(slug, { title, desc, content: blocks })
    }, 500)
    return ()=> clearTimeout(t)
  }, [title, desc, blocks])

  if (!project) {
    return (
      <section className="section"><div className="container">
        <h2>Project not found</h2>
        <p className="lead">เช็คลิงก์หรือกลับไปหน้า Projects</p>
      </div></section>
    )
  }

  const addBlock = (type) => {
    setBlocks(prev => [...prev, { id:newId(), type, text:'', checked:false, _mounted:false }])
  }
  const onChange = (b) => {
    setBlocks(prev => prev.map(x => x.id===b.id ? { ...b, _mounted:true } : x))
  }
  const onToggle = (b) => {
    setBlocks(prev => prev.map(x => x.id===b.id ? { ...b } : x))
  }
  const onRemove = (id) => setBlocks(prev => prev.filter(x => x.id !== id))

  return (
    <section className="section">
      <div className="container" style={{maxWidth:860}}>
        <div className="project-header">
          <input className="title-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Untitled" />
          <input className="desc-input" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description…" />
        </div>

        <div className="toolbar">
          <span className="kicker">Add block</span>
          <button className="filter" onClick={()=>addBlock('h1')}>H1</button>
          <button className="filter" onClick={()=>addBlock('h2')}>H2</button>
          <button className="filter" onClick={()=>addBlock('p')}>Text</button>
          <button className="filter" onClick={()=>addBlock('bullet')}>• Bullet</button>
          <button className="filter" onClick={()=>addBlock('todo')}>☑ To-do</button>
          <button className="filter" onClick={()=>addBlock('code')}>{`</>`} Code</button>
        </div>

        <div className="editor">
          {blocks.map(b => (
            <Block key={b.id} block={b} onChange={onChange} onToggle={onToggle} onRemove={onRemove}/>
          ))}
          {blocks.length === 0 && (
            <div className="empty">
              <p>เริ่มเขียนเลย หรือกดปุ่มด้านบนเพื่อเพิ่มบล็อก ✨</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
