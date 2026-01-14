// src/pages/ProjectViewer.jsx
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import data from "../../public/data.json";
import "github-markdown-css/github-markdown.css";

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
  const [content, setContent] = useState("");

  const [mapFolder, setMapFolder] = useState({
    "iot-production-line": {
      FOLDER: "iot_project",
      FILE_NAME: "iot.md",
    },
    "rag-chatbot": {
      FOLDER: "RAG",
      FILE_NAME: "RAG.md",
    },
    "dms": {
      FOLDER: "dms",
      FILE_NAME: "dms.md",
    },
    "auto-invoice": {
      FOLDER: "auto-invoice",
      FILE_NAME: "auto-invoice.md",
    },
  });

  // const project = data.find((p) => p.slug === slug);
  const project = mapFolder[slug];

  const getFile = () => {
    const path = `/${project.FOLDER}/${project.FILE_NAME}`;

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then((text) => {
        // ป้องกันกรณี path ผิดแล้ว Server ส่ง index.html กลับมา
        if (text.trim().startsWith("<!DOCTYPE html>")) {
          throw new Error("Got HTML instead of Markdown");
        }
        setContent(text);
      })
      .catch((err) => {
        setContent(`# Error Loading Project\n\nCould not load file: ${path}`);
      });
  };

  useEffect(() => {
    // console.log(slug);
    getFile();
  }, []);

  return (
    <div className="markdown-body" style={{ padding: "20px" }}>
      {/* แก้ไขจุดที่พิมพ์ผิดตรงนี้ครับ จาก / เป็น . */}
      {content && content.length > 0 ? (
        <ReactMarkdown
          urlTransform={(uri) => {
            if (uri.startsWith("http") || uri.startsWith("/")) return uri;
            return `/${project.FOLDER}/${uri}`;
          }}
          components={{
            img: ({ alt, ...props }) => (
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  margin: "20px 0",
                }}
              >
                <img
                  {...props}
                  alt={alt}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                {alt && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "10px",
                      color: "#6b7280",
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                    }}
                  >
                    {alt}
                  </span>
                )}
              </span>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
