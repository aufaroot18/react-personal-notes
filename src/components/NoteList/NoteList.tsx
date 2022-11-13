import type { FC } from "react";
import React from "react";

import type { NoteType } from "../../model/note";

import NoteItem from "../NoteItem";

interface NoteListProps {
  notes: NoteType[];
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

const NoteList: FC<NoteListProps> = (props) => {
  const { notes, onDelete, onArchive } = props;

  return (
    <React.Fragment>
      <div className="notes-list">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onArchive={onArchive}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default NoteList;
