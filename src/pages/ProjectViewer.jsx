// src/pages/ProjectViewer.jsx
import React from "react";
import { useParams } from "react-router-dom";
import data from "../../public/data.json"; 

function ViewBlock({ b }) {
  // เลือก "การ์ด" ให้บางประเภท
  const wrap = (children, card = false) => (
    <div className={card ? "v-card" : "v-block"}>{children}</div>
  );

  switch (b.type) {
    case "heading": {
      const Tag = `h${b.level || 1}`;
      return wrap(<Tag className={`vh-${b.level || 1}`}>{b.text}</Tag>);
    }
    case "paragraph":
      return wrap(<p className="vp">{b.text}</p>);
    case "list": {
      const items = (b.text || "").split(/\r?\n/).filter(Boolean);
      const Tag = b.style === "ordered" ? "ol" : "ul";
      return wrap(
        <Tag className="vlist">
          {items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </Tag>
      );
    }
    case "todo":
      return wrap(
        <label className="vtodo">
          <input type="checkbox" checked={!!b.checked} readOnly />
          <span className={b.checked ? "done" : ""}>{b.text}</span>
        </label>,
        true // ทำเป็นการ์ด
      );
    case "image":
      return wrap(
        <figure className="vimage">
          {b.url ? (
            <img src={b.url} alt={b.caption || ""} />
          ) : (
            <div className="img-ph">No image</div>
          )}
          {b.caption ? <figcaption>{b.caption}</figcaption> : null}
        </figure>,
        true // ทำเป็นการ์ด
      );
    case "callout":
      return wrap(<div className="vcallout">💡 {b.text}</div>, true);
    case "code":
      return wrap(
        <pre className={`vcode lang-${b.language || "text"}`}>
          <code>{b.text || ""}</code>
        </pre>,
        true // การ์ดโค้ด (สีเข้ม)
      );
    case "divider":
      return <hr className="v-divider" />;
    default:
      return wrap(<p className="vp">{b.text || ""}</p>);
  }
}

export default function ProjectViewer() {
  const { slug } = useParams();

  const project = data.find((p) => p.slug === slug);

  if (!project)
    return (
      <div className="wrap">
        <h2>Not found</h2>
      </div>
    );

  return (
    <div className="wrap viewer">
      <header className="v-head">
        <h1>{project.title}</h1>
        {project.desc ? <p className="vd">{project.desc}</p> : null}
      </header>

      <main className="v-content">
        {Array.isArray(project.content) && project.content.length > 0 ? (
          project.content.map((b) => <ViewBlock key={b.id} b={b} />)
        ) : (
          <p className="muted">No content.</p>
        )}
      </main>

      <style>{`
  .wrap.viewer{max-width:860px;margin:0 auto;padding:24px}
  .v-head h1{font-size:28px;margin:0 0 6px;font-weight:700;color:var(--text)}
  .vd{color:var(--muted);margin:0 0 20px}
  .v-content{display:grid;gap:12px}

  .v-block{padding:0;color:var(--text)}
  .v-card{padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--card);color:var(--text)}
  .vh-1{font-size:26px;font-weight:700}
  .vh-2{font-size:20px;font-weight:700}
  .vh-3{font-size:18px;font-weight:700}
  .vp{line-height:1.7;color:var(--text)}

  .vlist{padding-left:20px;line-height:1.7}
  .vtodo{display:flex;gap:8px;align-items:center}
  .vtodo .done{text-decoration:line-through;color:var(--muted)}

  .vimage img{max-width:100%;border-radius:10px;display:block;border:1px solid var(--border)}
  .vimage figcaption{text-align:center;color:var(--muted);font-size:12px;margin-top:6px}

  .vcallout{background:var(--callout-bg);border:1px solid var(--callout-border);padding:10px;border-radius:10px;color:var(--text)}
  .vcode{background:var(--code-bg);color:var(--code-text);padding:14px;border-radius:12px;overflow:auto}
  .v-divider{border:none;border-top:1px solid var(--border);margin:12px 0}
  .muted{color:var(--muted)}
`}</style>
    </div>
  );
}
