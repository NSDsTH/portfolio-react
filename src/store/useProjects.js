// src/store/useProjects.js
import { useEffect, useMemo, useState } from 'react'

const LS_KEY = 'portfolio.projects.v1'

// ตัวอย่างโปรเจกต์ตั้งต้น (แก้ไขเพิ่มเองได้)
const seed = [
  { title:'Portfolio UI', slug:'portfolio-ui', desc:'Figma → React/Vite with clean tokens.', tags:['React','CSS'], content:[] },
  { title:'OEE Dashboard', slug:'oee-dashboard', desc:'Realtime KPIs for factory lines.', tags:['Charts','SQL'], content:[] },
  {
    title:'RAG Chatbot',
    slug:'rag-chatbot',
    desc:'Qwen + Qdrant, internal knowledge.',
    tags:['LLM','VectorDB'],
    content:[
      { id:'b1', type:'h1', text:'RAG Chatbot — Overview' },
      { id:'b2', type:'p',  text:'แชตบอทถาม-ตอบความรู้ภายในองค์กร ใช้ Qdrant เก็บเวกเตอร์ + Qwen เป็น LLM' },
      { id:'b3', type:'h2', text:'Stack' },
      { id:'b4', type:'bullet', text:'Embedding: bge-small / jina-embeddings' },
      { id:'b5', type:'bullet', text:'Vector DB: Qdrant (HNSW, cosine)' },
      { id:'b6', type:'bullet', text:'Backend: Node/Express' },
      { id:'b7', type:'h2', text:'How it works' },
      { id:'b8', type:'p',  text:'1) Ingest → 2) Retrieve → 3) Rerank → 4) Generate' },
    ]
  },
  { title:'Defect Monitor', slug:'defect-monitor', desc:'Next.js widget set with filters.', tags:['Next.js','UI'], content:[] },
  { title:'Computer Vision', slug:'computer-vision', desc:'Pose/Action recognition pipeline.', tags:['CV','Py'], content:[] },
  { title:'Automation Pack', slug:'automation-pack', desc:'Scripts & bots for ops.', tags:['Node','Ops'], content:[] },
]

// สร้าง slug จากชื่อ
const slugify = (s='') =>
  s.toLowerCase().trim()
   .replace(/[^a-z0-9]+/g, '-')
   .replace(/^-+|-+$/g, '') || 'untitled'

export default function useProjects() {
  // โหลดจาก localStorage ครั้งแรก
  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? JSON.parse(raw) : seed
    } catch {
      return seed
    }
  })

  // บันทึกอัตโนมัติเมื่อ projects เปลี่ยน
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(projects))
  }, [projects])

  // เพิ่มโปรเจกต์ใหม่ แล้วรีเทิร์น object ที่สร้าง (ไว้พาไปหน้าแก้ไข)
  const addProject = (title) => {
    const base = slugify(title || 'untitled')
    let slug = base
    let i = 1
    while (projects.some(p => p.slug === slug)) slug = `${base}-${i++}`
    const proj = { title: title?.trim() || 'Untitled', slug, desc:'', tags:[], content:[] }
    setProjects(prev => [proj, ...prev])
    return proj
  }

  const getProject = (slug) => projects.find(p => p.slug === slug)

  // อัปเดตฟิลด์ของโปรเจกต์ที่มีอยู่ (เช่น title/desc/content/tags)
  const updateProject = (slug, patch) => {
    setProjects(prev => prev.map(p => p.slug === slug ? { ...p, ...patch } : p))
  }

  const removeProject = (slug) => {
    setProjects(prev => prev.filter(p => p.slug !== slug))
  }

  // memo ฟังก์ชัน/ค่า ไม่ให้สร้างใหม่ทุกครั้ง
  return useMemo(() => ({
    projects,
    addProject,
    getProject,
    updateProject,
    removeProject,
  }), [projects])
}

// (ถ้าอยากใช้แยกที่อื่นได้)
export { slugify }
