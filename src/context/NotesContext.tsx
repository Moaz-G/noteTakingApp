import { ReactNode, createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type NotesContextProviderProps = {
  children: ReactNode;
};

type NotesContext = {
  createNote: (title: string, body: string, check: Tags[]) => void;
  editNote: (title: string, body: string, id: any,check: Tags[]) => void;
  deleteNote: (id: any) => void;
  notes: NotesData[];
  createTags: (title: string) => void;
  editTags: (title: string, id: any) => void;
  deleteTags: (id: any) => void;
  availabelTags: Tags[];
};

type Tags = {
  id: string;
  tName: string;
};

type NotesData = {
  id: string;
  title: string;
  body: string;
  tags: Tags[];
};

const NotesContext = createContext({} as NotesContext);

export function useNotes() {
  return useContext(NotesContext);
}

export function NotesContextProvider({ children }: NotesContextProviderProps) {
  const [notes, setNotes] = useState<NotesData[]>([]);
  const [availabelTags, setAvailabelTags] = useState<Tags[]>([]);

  function createNote(title: string, body: string, check: Tags[]) {
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: uuidv4(), title: title, body: body, tags: check },
    ]);
  }

  function editNote(title: string, body: string, id: any, check: Tags[]) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id == id) {
          return { ...note, title: title, body: body, tags: check };
        } else {
          return note;
        }
      });
    });
  }

  function deleteNote(id: any) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id != id));
  }

  function createTags(title: string) {
    setAvailabelTags((prevTags) => [
      ...prevTags,
      { id: uuidv4(), tName: title },
    ]);
  }

  function editTags(title: string, id: any) {
    setAvailabelTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id == id) {
          return { ...tag, tName: title };
        } else {
          return tag;
        }
      });
    });
    setNotes((prevNotes) =>
    prevNotes.map((note) => ({
      ...note,
      tags: note.tags.map((tag) => {
      if(tag.id == id) {
        return { ...tag, tName: title };
      } else {
        return tag;
      }  
    })
  })))
}
  function deleteTags(id: any) {
    setAvailabelTags((prevTags) => prevTags.filter((tag) => tag.id != id));
    setNotes((prevNotes) =>
      prevNotes.map((note) => ({
        ...note,
        tags: note.tags.filter((tag) => tag.id !== id),
      }))
    );
  }

  return (
    <NotesContext.Provider
      value={{
        createNote,
        editNote,
        deleteNote,
        notes,
        createTags,
        editTags,
        deleteTags,
        availabelTags,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
