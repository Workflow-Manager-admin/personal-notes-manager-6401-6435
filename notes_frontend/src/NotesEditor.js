import React, { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
export default function NotesEditor({ note, onSave, isEditMode }) {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const [error, setError] = useState("");
  const titleInput = useRef(null);

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
    setError("");
    if (isEditMode && titleInput.current) {
      titleInput.current.focus();
    }
  }, [note, isEditMode]);

  function handleSave(e) {
    e.preventDefault();
    if (title.trim() === "" && content.trim() === "") {
      setError("Please enter a title or body.");
      return;
    }
    setError("");
    onSave({ ...note, title, content });
  }

  return (
    <form className="note-editor" onSubmit={handleSave} autoComplete="off">
      <label>
        <span className="editor-label">Title</span>
        <input
          ref={titleInput}
          type="text"
          className="editor-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          maxLength={120}
        />
      </label>
      <label>
        <span className="editor-label">Body</span>
        <textarea
          className="editor-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          rows={10}
        />
      </label>
      <button className="accent-btn" type="submit" style={{ marginTop: "1rem" }}>
        Save
      </button>
      {error && <div className="error-msg">{error}</div>}
    </form>
  );
}
