import React, { useState, useEffect } from "react";
import NotesEditor from "./NotesEditor";

// PUBLIC_INTERFACE
export default function NotesMainPanel({
  mode,
  note,
  onSave,
  onEdit,
  onDelete,
  onCreateNew,
  disableEdit,
}) {
  const [editorState, setEditorState] = useState({ title: "", content: "" });

  useEffect(() => {
    setEditorState({ title: note.title || "", content: note.content || "" });
  }, [note, mode]);

  if (mode === "create") {
    return (
      <main className="main-panel">
        <h2 className="main-title">Create New Note</h2>
        <NotesEditor
          note={{ title: "", content: "" }}
          onSave={(noteData) => onSave(noteData)}
          isEditMode={true}
        />
      </main>
    );
  }

  if (mode === "edit") {
    return (
      <main className="main-panel">
        <h2 className="main-title">Edit Note</h2>
        <NotesEditor
          note={{ ...note }}
          onSave={(noteData) =>
            onSave({ ...note, title: noteData.title, content: noteData.content })
          }
          isEditMode={true}
        />
        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
          style={{ marginTop: "2rem" }}
        >
          Delete
        </button>
      </main>
    );
  }

  // View mode
  return (
    <main className="main-panel">
      {note && note.id ? (
        <>
          <div className="main-title-area">
            <h2 className="main-title">
              {note.title ? note.title : "Untitled Note"}
            </h2>
            <button className="accent-btn" onClick={() => onEdit(note.id)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(note.id)}
              style={{ marginLeft: "1rem" }}
            >
              Delete
            </button>
          </div>
          <div className="note-dates">
            Last Edited:{" "}
            {note.lastEdited
              ? new Date(note.lastEdited).toLocaleString()
              : "N/A"}
          </div>
          <article className="note-content">
            {note.content ? note.content : <em>No content...</em>}
          </article>
        </>
      ) : (
        <section className="main-panel-placeholder">
          <h3>No note selected</h3>
          <button className="accent-btn" onClick={onCreateNew}>
            Create a Note
          </button>
        </section>
      )}
    </main>
  );
}
