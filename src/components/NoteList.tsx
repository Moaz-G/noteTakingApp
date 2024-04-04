import { NavLink } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { useMemo, useState } from "react";
import "../shadow.css"
import TagModal from "./TagModal";

export default function NoteList() {
  const { notes, availabelTags } = useNotes();
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState<boolean>(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        title === "" || note.title.toLowerCase().includes(title.toLowerCase())
      );
    });
  }, [title, notes]);
  console.log(notes);
  console.log(availabelTags);
  return (
    <>
    <div className="fixed inset-0 z-50">
    {toggle && <div className="absolute inset-0 bg-black bg-opacity-50"></div> }
    <div className="flex px-1.5	py-1.5">
      <span className="text-2xl font-bold">Notes</span>
        <NavLink to="/newnote" className=" ml-auto py-1.5 px-1.5 text-white bg-sky-400 border rounded border-solid border-transparent hover:bg-white hover:text-sky-400 hover:border-black">
          <button>Create</button>
        </NavLink>
        <button onClick={() => setToggle(!toggle)}  className=" ml-2 py-1.5 px-1.5 text-black bg-white border rounded border-black border-solid hover:bg-gray-700 hover:text-white">
          Edit Tag
        </button>   
    </div>
    <div className="inline-flex flex-col px-1.5">
      <label htmlFor="title">Title</label>
      <input
        type="search"
        name="title"
        id="title"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
     </div> 
      {/*Note List*/}
      <div className="grid grid-cols-4 gap-2 m-2.5">
      {filteredNotes.map((note) => {
        return (
          <div key={note.id} className="relative px-1.5	py-1.5 card-hover border rounded border-stone-300 border-solid transition-transform duration-300 hover:scale-105 hover:border-transparent">
            <NavLink to={`/${note.id}`} >
              {/*<div>{note.id}</div>*/}
              <div className="text-md font-bold  ml-1">{note.title}</div>
              <div className=" ml-1 my-1">{note.body}</div>
              {note.tags.map((tag) => (
                <span key={tag.id} className=" ml-1 py-0.5 px-0.5 text-white bg-sky-400 border rounded border-solid border-transparent">
                  {/*tag.id*/}{tag.tName}
                </span>
              ))}
            </NavLink>
          </div>
        );
      })}
      </div>
    {toggle &&
    <> 
    <div className="absolute flex flex-col h-96 w-96 top-6 left-1/3 bg-white p-2">  
    <TagModal /> 
    <button type="button"  onClick={() => setToggle(!toggle)} className=" self-end my-1.5 py-1.5 px-1.5 text-black bg-white border rounded border-black border-solid hover:bg-gray-700 hover:text-white">Close</button>
    </div> 
    </>
    }
    </div>
    </>
  );
}
