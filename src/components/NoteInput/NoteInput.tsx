import type { FC } from "react";
import React, { useState, FormEvent } from "react";

import { NoteType } from "../../model/note";
import { validateForm } from "../../utils";

interface NoteInputProps {
  onAddNote: (note: NoteType) => void;
}

const NoteInput: FC<NoteInputProps> = (props) => {
  const { onAddNote } = props;

  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const onSubmitHandler = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const newNote: NoteType = {
      ...input,
      id: +new Date(),
      createdAt: new Date().toString(),
      archived: false,
    };
    onAddNote(newNote);

    resetForm();
  };

  const resetForm = () => {
    setInput({
      title: "",
      body: "",
    });
  };

  const onInputChangeHandler = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    if (validateForm(value)) return;

    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="note-input">
      <h2>Buat Catatan</h2>
      <form onSubmit={onSubmitHandler}>
        <p className="note-input__title__char-limit">
          Sisa karakter: {50 - input.title.length}
        </p>
        <input
          className="note-input__title"
          type="text"
          name="title"
          placeholder="Ini adalah judul..."
          onChange={onInputChangeHandler}
          value={input.title}
        />
        <textarea
          className="note-input__body"
          name="body"
          placeholder="Tuliskan catatanmu di sini..."
          onChange={onInputChangeHandler}
          value={input.body}
        />
        <button type="submit">Buat</button>
      </form>
    </div>
  );
};

export default NoteInput;
