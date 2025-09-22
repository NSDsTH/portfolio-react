// src/store/useProjects.js
import { useEffect, useMemo, useState } from 'react'

const LS_KEY_V2 = 'portfolio.projects.v2'
const LS_KEY_V1 = 'portfolio.projects.v1' // อ่านเพื่อตรวจแล้ว migrate

// ----------------------------- Utils -----------------------------
const slugify = (s='') =>
  s.toLowerCase().trim()
   .replace(/[^a-z0-9]+/g, '-')
   .replace(/^-+|-+$/g, '') || 'untitled'

const newId = () => Math.random().toString(36).slice(2, 9)

// แปลง block แบบเก่า => แบบใหม่
function migrateContent(oldContent = []) {
  if (!Array.isArray(oldContent)) return []

  const blocks = []
  oldContent.forEach((b, idx) => {
    const id = b?.id || `m-${Date.now()}-${idx}`
    const type = b?.type
    const text = (b?.text ?? '').toString()

    if (type === 'h1' || type === 'h2' || type === 'h3') {
      const level = type === 'h1' ? 1 : type === 'h2' ? 2 : 3
      blocks.push({ id, type: 'heading', level, text })
    } else if (type === 'p' || type === 'paragraph') {
      blocks.push({ id, type: 'paragraph', text })
    } else if (type === 'bullet' || type === 'list') {
      // เก่าของแกบางครั้งเก็บเป็น text เดียวต่อด้วย \n หรือ comma
      if (Array.isArray(b.items)) {
        blocks.push({ id, type: 'list', style: 'bullet', text: b.items.join('\n') })
      } else {
        const items = text.split(/\r?\n|,|;/).map(s => s.trim()).filter(Boolean)
        if (items.length <= 1) {
          blocks.push({ id, type: 'paragraph', text })
        } else {
          blocks.push({ id, type: 'list', style: 'bullet', text: items.join('\n') })
        }
      }
    } else if (type === 'image' && b.url) {
      blocks.push({ id, type: 'image', url: b.url, caption: b.caption || '' })
    } else if (type === 'code') {
      blocks.push({ id, type: 'code', language: b.language || 'text', text })
    } else if (type === 'divider') {
      blocks.push({ id, type: 'divider' })
    } else if (type === 'callout') {
      blocks.push({ id, type: 'callout', text })
    } else if (type === 'todo') {
      blocks.push({ id, type: 'todo', text, checked: !!b.checked })
    } else {
      // fallback
      if (text) blocks.push({ id, type: 'paragraph', text })
    }
  })
  return blocks
}

// เช็คว่าเป็นฟอร์แมตใหม่หรือยัง
function isNewContent(content) {
  if (!Array.isArray(content)) return false
  // new format ใช้ type เช่น heading/paragraph/list...
  const known = new Set(['heading','paragraph','list','todo','code','image','callout','divider'])
  return content.every(
    b => b && typeof b === 'object' && typeof b.type === 'string' && known.has(b.type)
  )
}

// migrate ทั้งโปรเจกต์ (title/slug/desc/tags/content)
function migrateProject(p) {
  if (!p || typeof p !== 'object') return null
  const base = {
    title: (p.title ?? 'Untitled').toString().trim() || 'Untitled',
    slug: (p.slug ?? slugify(p.title || 'Untitled')),
    desc: (p.desc ?? '').toString(),
    tags: Array.isArray(p.tags) ? p.tags : [],
    content: [],
  }

  if (isNewContent(p.content)) {
    base.content = p.content
  } else if (Array.isArray(p.content)) {
    base.content = migrateContent(p.content)
  } else if (typeof p.content === 'string') {
    // เผื่อกรณีในอนาคตที่เก็บ markdown เป็น string — เก็บเป็น paragraph เดียวก่อน
    base.content = [{ id: newId(), type: 'paragraph', text: p.content }]
  } else {
    base.content = []
  }
  return base
}

// ----------------------------- Seed (ฟอร์แมตใหม่) -----------------------------
const seedV2 = [
  {
    title:'Portfolio UI',
    slug:'portfolio-ui',
    desc:'Figma → React/Vite with clean tokens.',
    tags:['React','CSS'],
    content: [
      { id:newId(), type:'heading', level:1, text:'Portfolio UI — Overview' },
      { id:newId(), type:'paragraph', text:'โปรเจกต์พอร์ตที่ออกแบบจาก Figma แล้วเขียนจริงด้วย React/Vite + Design Tokens' },
      { id:newId(), type:'list', style:'bullet', text:'Tech: React/Vite/Tailwind\nDesign Tokens: CSS vars\nDeploy: Vercel' },
    ],
  },
  {
    title:'IoT Production Line',
    slug:'iot-production-line',
    desc:'Realtime KPIs for factory lines.',
    tags:['Charts','SQL'],
    content: [
      { id:newId(), type:'heading', level:1, text:'IoT Production Line' },
      { id:newId(), type:'paragraph', text:'ดึงข้อมูล sensor/PLC ผ่าน gateway → เก็บฐานข้อมูล → สร้าง KPI แบบเรียลไทม์' },
      { id:newId(), type:'callout', text:'จุดเด่น: วัด OEE/Throughput/Reject แบบ real-time ใช้ dashboard เดียว' },
      { id:newId(), type:'divider' },
    ],
  },
  {
    title:'RAG Chatbot',
    slug:'rag-chatbot',
    desc:'Qwen + Qdrant, internal knowledge.',
    tags:['LLM','VectorDB'],
    content: [
      { id:newId(), type:'heading', level:1, text:'RAG Chatbot — Overview' },
      { id:newId(), type:'paragraph', text:'แชตบอทถาม-ตอบความรู้ภายในองค์กร ใช้ Qdrant เก็บเวกเตอร์ + Qwen เป็น LLM' },
      { id:newId(), type:'heading', level:2, text:'Stack' },
      { id:newId(), type:'list', style:'bullet', text:'Embedding: bge-small / jina-embeddings\nVector DB: Qdrant (HNSW, cosine)\nBackend: Node/Express' },
      { id:newId(), type:'heading', level:2, text:'How it works' },
      { id:newId(), type:'paragraph', text:'1) Ingest → 2) Retrieve → 3) Rerank → 4) Generate' },
      { id:newId(), type:'code', language:'js', text:"// example: embed flow\nawait embed(doc)\n// ..."},
    ],
  },
  {
    title:'PCB Defect Detection',
    slug:'pcb-defect-detection',
    desc:'Next.js widget set with filters.',
    tags:['Next.js','UI'],
    content: [
      { id:newId(), type:'heading', level:1, text:'PCB Defect Detection' },
      { id:newId(), type:'paragraph', text:'วิดเจ็ตสำหรับดูผลตรวจจับ defect: filter ตามชนิดตำหนิ / วันเวลา / รุ่น' },
    ],
  },
  {
    title:'Computer Vision',
    slug:'computer-vision',
    desc:'Pose/Action recognition pipeline.',
    tags:['CV','Py'],
    content: [
      { id:newId(), type:'heading', level:1, text:'Computer Vision' },
      { id:newId(), type:'paragraph', text:'โครงท่อสำหรับ Pose/Action recognition: MediaPipe → ST-GCN → Inference' },
    ],
  },
  {
    title:'Automation Pack',
    slug:'automation-pack',
    desc:'Scripts & bots for ops.',
    tags:['Node','Ops'],
    content: [
      { id:newId(), type:'heading', level:1, text:'Automation Pack' },
      { id:newId(), type:'paragraph', text:'รวมสคริปต์ออโต้งาน routine (เช่น ดึงรายงาน/ส่งอีเมล/เคลียร์ไฟล์)' },
      { id:newId(), type:'todo', text:'เพิ่มตัวตั้งเวลาส่งรายงานประจำวัน', checked:false },
    ],
  },
]

// ----------------------------- Hook -----------------------------
export default function useProjects() {
  // โหลดครั้งแรก: พยายามอ่าน v2 ก่อน ถ้าไม่มีลองอ่าน v1 แล้ว migrate
  const [projects, setProjects] = useState(() => {
    try {
      const rawV2 = localStorage.getItem(LS_KEY_V2)
      if (rawV2) {
        const data = JSON.parse(rawV2)
        // เผื่อคนเปลี่ยน schema เอง ตรวจสอบให้แน่ใจว่าเป็นแบบใหม่
        const fixed = Array.isArray(data) ? data.map(migrateProject).filter(Boolean) : seedV2
        return fixed
      }

      // ไม่มี v2 → ลอง v1
      const rawV1 = localStorage.getItem(LS_KEY_V1)
      if (rawV1) {
        const old = JSON.parse(rawV1)
        const migrated = (Array.isArray(old) ? old : []).map(migrateProject).filter(Boolean)
        return migrated.length ? migrated : seedV2
      }

      // ไม่มีอะไรเลย → ใช้ seed ใหม่
      return seedV2
    } catch {
      return seedV2
    }
  })

  // บันทึกอัตโนมัติเมื่อ projects เปลี่ยน -> เก็บลง v2
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY_V2, JSON.stringify(projects))
    } catch {
      // เงียบ ๆ ก็ได้
    }
  }, [projects])

  // เพิ่มโปรเจกต์ใหม่
  const addProject = (title) => {
    const base = slugify(title || 'untitled')
    let slug = base
    let i = 1
    while (projects.some(p => p.slug === slug)) slug = `${base}-${i++}`
    const proj = {
      title: title?.trim() || 'Untitled',
      slug,
      desc:'',
      tags:[],
      content:[
        { id:newId(), type:'heading', level:1, text:(title?.trim() || 'Untitled') },
        { id:newId(), type:'paragraph', text:'เริ่มเขียนคำอธิบายโปรเจกต์ที่นี่…' },
      ],
    }
    setProjects(prev => [proj, ...prev])
    return proj
  }

  const getProject = (slug) => projects.find(p => p.slug === slug)

  // อัปเดตโปรเจกต์ (merge patch)
  const updateProject = (slug, patch) => {
    setProjects(prev =>
      prev.map(p => p.slug === slug ? migrateProject({ ...p, ...patch }) : p)
    )
  }

  const removeProject = (slug) => {
    setProjects(prev => prev.filter(p => p.slug !== slug))
  }

  // memo ฟังก์ชัน/ค่า
  return useMemo(() => ({
    projects,
    addProject,
    getProject,
    updateProject,
    removeProject,
  }), [projects])
}

// export utils ถ้าต้องใช้ที่อื่น
export { slugify, migrateContent, migrateProject }
