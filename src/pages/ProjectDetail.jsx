// src/pages/ProjectDetail.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EditorBlock from "../components/EditorBlock";
import data from "../../public/data.json"; // อ่านไฟล์ JSON ต้นทาง (read-only ตอนรันจริง)

const newId = () => Math.random().toString(36).slice(2, 9);

// ===== เพิ่ม util: export ไฟล์ JSON =====
function downloadJSON(filename, jsonObj) {
  const blob = new Blob([JSON.stringify(jsonObj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ------------------------ Page ------------------------
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = data.find((p) => p.slug === slug); // อ่านข้อมูลจากไฟล์ JSON

  const [title, setTitle] = useState(project?.title || "");
  const [desc, setDesc] = useState(project?.desc || "");
  const [blocks, setBlocks] = useState(project?.content || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!project) return;
    setTitle(project.title);
    setDesc(project.desc);
    setBlocks(project.content || []);
  }, [slug]);

  // ----- NEW: ปุ่ม Save → Export JSON -----
  const onSaveToJson = () => {
    setSaving(true);
    try {
      // รวมค่าที่แก้ไขเข้า dataset เดิม
      const updated = data.map(p =>
        p.slug === slug ? { ...p, title, desc, content: blocks } : p
      );
      // ดาวน์โหลดไฟล์ data.json ใหม่
      downloadJSON("data.json", updated);
    } finally {
      setTimeout(() => setSaving(false), 300);
    }
  };

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <h2>Project not found</h2>
          <p className="lead">เช็คลิงก์หรือกลับไปหน้า Projects</p>
        </div>
      </section>
    );
  }

  const addBlock = (type, extra = {}) => {
    const defByType = {
      heading: { text: "", level: 1 }, paragraph: { text: "" },
      list: { text: "", style: "bullet" }, todo: { text: "", checked: false },
      code: { text: "", language: "text" }, image: { url: "", caption: "" },
      callout: { text: "" }, divider: {},
    };
    const d = { id: newId(), type, _mounted: false, ...(defByType[type] || { text: "" }), ...extra };
    setBlocks(prev => [...prev, d]);
  };
  const insertAfter = (id, newType="paragraph") => {
    setBlocks(prev => {
      const i = prev.findIndex(b => b.id === id);
      const copy = [...prev];
      const def = { id: newId(), type:newType, text:"", _mounted:false };
      copy.splice(i+1, 0, def);
      return copy;
    });
  };
  const onChange = (b) => setBlocks(prev => prev.map(x => x.id === b.id ? { ...b, _mounted:true } : x));
  const onToggle  = (b) => setBlocks(prev => prev.map(x => x.id === b.id ? { ...b } : x));
  const onRemove  = (id) => setBlocks(prev => prev.filter(x => x.id !== id));
  const onFocusMove = () => {};

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <div className="project-header">
          <input className="title-input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Untitled"/>
          <input className="desc-input"  value={desc}  onChange={(e)=>setDesc(e.target.value)}  placeholder="Short description…"/>
        </div>

        <div className="toolbar">
          <span className="kicker">Add block</span>
          <button className="filter" onClick={()=>addBlock("heading", { level:1 })}>H1</button>
          <button className="filter" onClick={()=>addBlock("heading", { level:2 })}>H2</button>
          <button className="filter" onClick={()=>addBlock("heading", { level:3 })}>H3</button>
          <button className="filter" onClick={()=>addBlock("paragraph")}>Text</button>
          <button className="filter" onClick={()=>addBlock("list")}>• List</button>
          <button className="filter" onClick={()=>addBlock("todo")}>☑ To-do</button>
          <button className="filter" onClick={()=>addBlock("code")}>{"</>"} Code</button>
          <button className="filter" onClick={()=>addBlock("image")}>🖼 Image</button>
          <button className="filter" onClick={()=>addBlock("callout")}>💡 Callout</button>
          <button className="filter" onClick={()=>addBlock("divider")}>— Divider</button>

          {/* ปุ่ม Save JSON */}
          <div style={{ marginLeft: "auto" }} />
          <button className="filter" onClick={onSaveToJson} disabled={saving}>
            {saving ? "Saving…" : "Save (Export JSON)"}
          </button>
        </div>

        <div className="editor">
          {blocks.map((b) => (
            <EditorBlock key={b.id} block={b} onChange={onChange} onToggle={onToggle}
                   onRemove={onRemove} onInsertAfter={(id)=>insertAfter(id)} onFocusMove={onFocusMove}/>
          ))}
          {blocks.length === 0 && (
            <div className="empty">
              <p>เริ่มเขียนเลย หรือกดปุ่มด้านบนเพื่อเพิ่มบล็อก ✨</p>
            </div>
          )}
        </div>
      </div>

      {/* style เดิมของไฟล์นี้คงไว้ได้ */}
    </section>
  );
}
