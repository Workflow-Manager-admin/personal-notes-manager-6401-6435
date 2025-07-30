import React, { useState, useEffect } from "react";
import "./App.css";
import NotesSidebar from "./NotesSidebar";
import NotesMainPanel from "./NotesMainPanel";

// Define the structure of a note
const emptyNote = {
  id: "",
  title: "",
  content: "",
  lastEdited: "",
};

// Util for generating unique IDs
function generateId() {
  return "_" + Math.random().toString(36).slice(2, 10);
}

// PUBLIC_INTERFACE
function App() {
  // State for notes and currently selected note
  const [notes, setNotes] = useState(() => {
    // Load notes from localStorage (simple no-backend persistence)
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeNoteId, setActiveNoteId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mainPanelMode, setMainPanelMode] = useState("view"); // 'view', 'edit', or 'create'

  // Update localStorage on note changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Initialize selection
  useEffect(() => {
    if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0].id);
      setMainPanelMode("view");
    }
    if (notes.length === 0) {
      setActiveNoteId("");
      setMainPanelMode("create"); // Show empty create pane if no notes
    }
  }, [notes, activeNoteId]);

  // Filtered notes by search
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectNote = (id) => {
    setActiveNoteId(id);
    setMainPanelMode("view");
  };

  // PUBLIC_INTERFACE
  const handleCreateNote = () => {
    setActiveNoteId("");
    setMainPanelMode("create");
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = (note) => {
    if (note.id) {
      // Update existing
      setNotes((prev) =>
        prev.map((n) =>
          n.id === note.id ? { ...note, lastEdited: new Date().toISOString() } : n
        )
      );
    } else {
      // New note
      const newNote = {
        ...note,
        id: generateId(),
        lastEdited: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
      setActiveNoteId(newNote.id);
    }
    setMainPanelMode("view");
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId("");
      setMainPanelMode("create");
    }
  };

  // PUBLIC_INTERFACE
  const handleEditNote = (id) => {
    setActiveNoteId(id);
    setMainPanelMode("edit");
  };

  // Get active note, or a blank object for new note
  const activeNote =
    activeNoteId && notes.find((n) => n.id === activeNoteId)
      ? notes.find((n) => n.id === activeNoteId)
      : { ...emptyNote };

  return (
    <div className="notes-app-root">
      <NotesSidebar
        notes={filteredNotes}
        activeNoteId={activeNoteId}
        onSelect={handleSelectNote}
        onCreate={handleCreateNote}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />
      <NotesMainPanel
        mode={mainPanelMode}
        note={activeNote}
        onSave={handleSaveNote}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        onCreateNew={handleCreateNote}
        disableEdit={notes.length === 0}
      />
    </div>
  );
}

export default App;
