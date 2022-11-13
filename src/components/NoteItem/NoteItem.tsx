import type { FC } from "react";
import React from "react";

import type { NoteType } from "../../model/note";
import { showFormattedDate } from "../../utils";

interface NoteItemProps {
  note: NoteType;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

const NoteItem: FC<NoteItemProps> = (props) => {
  const { note, onDelete, onArchive } = props;

  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">{note.title}</h3>
        <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
        <p className="note-item__body">{note.body}</p>
      </div>
      <div className="note-item__action">
        <button
          className="note-item__delete-button"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
        <button
          className="note-item__archive-button"
          onClick={() => onArchive(note.id)}
        >
          Arsip
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
