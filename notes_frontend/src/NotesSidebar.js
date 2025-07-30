import React from "react";

// PUBLIC_INTERFACE
export default function NotesSidebar({
  notes,
  activeNoteId,
  onSelect,
  onCreate,
  onSearch,
  searchTerm,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>My Notes</h2>
        <button className="accent-btn create-btn" onClick={onCreate}>
          ＋ New Note
        </button>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search notes"
      />
      <ul className="notes-list" aria-label="Notes list">
        {notes.length === 0 ? (
          <li className="empty-state">No notes found.</li>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              className={
                "note-list-item" +
                (note.id === activeNoteId ? " active-note" : "")
              }
              onClick={() => onSelect(note.id)}
              tabIndex={0}
              aria-current={note.id === activeNoteId ? "true" : "false"}
            >
              <div className="note-title">{note.title || "Untitled Note"}</div>
              <div className="note-edited">
                {note.lastEdited
                  ? new Date(note.lastEdited).toLocaleString()
                  : ""}
              </div>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
