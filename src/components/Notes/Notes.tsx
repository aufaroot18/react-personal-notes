import { FC, useState } from "react";
import React from "react";

import { getInitialData } from "../../utils/";
import { NoteType } from "../../model/note";
import NoteList from "../NoteList/NoteList";
import EmptyNote from "../EmptyNote";
import NoteInput from "../NoteInput";

const Notes: FC<unknown> = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [search, setSearch] = useState<string>("");
  const isNotesEmpty = notes.length === 0;
  const isArchivedNotesEmpty =
    notes.filter((note) => note.archived).length === 0;

  const onAddNoteHandler = (note: NoteType) => setNotes([...notes, note]);

  const onDeleteHandler = (id: number) =>
    setNotes(notes.filter((note) => note.id !== id));

  const onArchiveHandler = (id: number) => {
    const foundNoteIndex = notes.findIndex((note) => note.id === id);

    if (foundNoteIndex > -1) {
      const updateNotes = [...notes];

      updateNotes[foundNoteIndex].archived =
        !updateNotes[foundNoteIndex].archived;

      setNotes(updateNotes);
    }
  };

  const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const getFilteredNotes = () =>
    notes.filter(
      (note) => !note.archived && note.title.toLowerCase().includes(search)
    );

  const getArchivedNotes = () => notes.filter((note) => note.archived);

  return (
    <React.Fragment>
      <div className="note-app__header">
        <h1>Notes</h1>
        <div className="note-search">
          <input
            type="text"
            placeholder="Cari catatan..."
            value={search}
            onChange={onSearchHandler}
          />
        </div>
      </div>
      <div className="note-app__body">
        <NoteInput onAddNote={onAddNoteHandler} />
        <h2>Catatan Aktif</h2>
        {isNotesEmpty ? (
          <EmptyNote />
        ) : (
          <NoteList
            notes={getFilteredNotes()}
            onDelete={onDeleteHandler}
            onArchive={onArchiveHandler}
          />
        )}
        <h2>Arsip</h2>
        {isArchivedNotesEmpty ? (
          <EmptyNote />
        ) : (
          <NoteList
            notes={getArchivedNotes()}
            onDelete={onDeleteHandler}
            onArchive={onArchiveHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Notes;
