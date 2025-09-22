// src/components/EditorBlock.jsx
import React, { useEffect, useRef } from "react";

function BlockTools({ onRemove }) {
  return (
    <div className="block-tools">
      <button onClick={onRemove} title="Delete">✕</button>
    </div>
  );
}

export default function EditorBlock({
  block,
  onChange,
  onToggle,
  onRemove,
  onInsertAfter,
  onFocusMove,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!block._mounted && ref.current) ref.current.focus();
  }, [block._mounted]);

  const getText = () =>
    (ref.current?.textContent ?? "").replace(/\u200B/g, "");

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && block.type !== "code") {
      e.preventDefault();
      onInsertAfter(block.id);
    }
    if (e.key === "Backspace") {
      const empty =
        (block.type === "list"
          ? !block.text?.trim()
          : !getText().trim()) && !["image", "divider"].includes(block.type);
      if (empty) {
        e.preventDefault();
        onRemove(block.id, { focusPrev: true });
      }
    }
    if (e.key === "ArrowUp") {
      if (window.getSelection()?.anchorOffset === 0) onFocusMove(block.id, -1);
    }
    if (e.key === "ArrowDown") {
      onFocusMove(block.id, +1);
    }
  };

  const editable = {
    ref,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onKeyDown,
  };
  const setText = (text) => onChange({ ...block, text, _mounted: true });

  // ---- Render by type ----
  if (block.type === "heading") {
    const Level = `h${block.level || 1}`;
    return (
      <div className="block block-heading" data-id={block.id}>
        {React.createElement(
          Level,
          {
            ...editable,
            onInput: (e) => setText(e.currentTarget.textContent),
            className: `block-input heading-${block.level || 1}`,
          },
          block.text || ""
        )}
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  if (block.type === "paragraph") {
    return (
      <div className="block block-paragraph" data-id={block.id}>
        <p
          {...editable}
          className="block-input"
          onInput={(e) => setText(e.currentTarget.textContent)}
        >
          {block.text || ""}
        </p>
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  if (block.type === "list") {
    const items = (block.text || "").split(/\r?\n/).filter(Boolean);
    const Tag = block.style === "ordered" ? "ol" : "ul";
    return (
      <div className="block block-list" data-id={block.id}>
        <div className="list-style">
          <select
            value={block.style || "bullet"}
            onChange={(e) =>
              onChange({ ...block, style: e.target.value, _mounted: true })
            }
          >
            <option value="bullet">• Bullet</option>
            <option value="ordered">1. Ordered</option>
          </select>
        </div>
        <div
          {...editable}
          className="block-input list-editor"
          onInput={(e) => setText(e.currentTarget.textContent)}
          data-placeholder="พิมพ์แต่ละข้อขึ้นบรรทัดใหม่"
        >
          {block.text || ""}
        </div>
        <div className="list-preview">
          {React.createElement(
            Tag,
            {},
            items.map((li, i) => <li key={i}>{li}</li>)
          )}
        </div>
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  if (block.type === "todo") {
    return (
      <div className="block block-todo" data-id={block.id}>
        <label className="todo-line">
          <input
            type="checkbox"
            checked={!!block.checked}
            onChange={() =>
              onToggle({ ...block, checked: !block.checked, _mounted: true })
            }
          />
          <span
            {...editable}
            className={`block-input ${block.checked ? "done" : ""}`}
            onInput={(e) => setText(e.currentTarget.textContent)}
          >
            {block.text || ""}
          </span>
        </label>
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div className="block block-code" data-id={block.id}>
        <div className="code-meta">
          <select
            value={block.language || "text"}
            onChange={(e) =>
              onChange({ ...block, language: e.target.value, _mounted: true })
            }
          >
            <option value="text">text</option>
            <option value="js">js</option>
            <option value="ts">ts</option>
            <option value="py">py</option>
            <option value="sql">sql</option>
            <option value="bash">bash</option>
            <option value="json">json</option>
          </select>
        </div>
        <pre
          className={`code lang-${block.language || "text"}`}
          spellCheck={false}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              document.execCommand("insertText", false, "  ");
            }
          }}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setText(e.currentTarget.textContent)}
        >
          {block.text || ""}
        </pre>
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <div className="block block-image" data-id={block.id}>
        {block.url ? (
          <figure className="image-figure">
            <img src={block.url} alt={block.caption || ""} />
            <figcaption
              {...editable}
              className="caption"
              onInput={(e) =>
                onChange({
                  ...block,
                  caption: e.currentTarget.textContent,
                  _mounted: true,
                })
              }
            >
              {block.caption || "คำอธิบายภาพ"}
            </figcaption>
          </figure>
        ) : (
          <div className="image-input">
            <input
              type="text"
              placeholder="วางลิงก์รูปภาพ (URL)"
              value={block.url || ""}
              onChange={(e) =>
                onChange({ ...block, url: e.target.value, _mounted: true })
              }
            />
          </div>
        )}
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  if (block.type === "callout") {
    return (
      <div className="block block-callout" data-id={block.id}>
        <div className="callout-sign">💡</div>
        <div
          {...editable}
          className="block-input"
          onInput={(e) => setText(e.currentTarget.textContent)}
        >
          {block.text || "ใส่ข้อความเน้นสำคัญ"}
        </div>
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  if (block.type === "divider") {
    return (
      <div className="block block-divider" data-id={block.id}>
        <hr />
        <BlockTools onRemove={() => onRemove(block.id)} />
      </div>
    );
  }

  // fallback
  return (
    <div className="block block-paragraph" data-id={block.id}>
      <p
        {...editable}
        className="block-input"
        onInput={(e) => setText(e.currentTarget.textContent)}
      >
        {block.text || ""}
      </p>
      <BlockTools onRemove={() => onRemove(block.id)} />
    </div>
  );
}
