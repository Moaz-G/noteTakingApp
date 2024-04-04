import { NavLink, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { FormEvent, useRef, useState } from "react";
import "../shadow.css";

type Tags = {
  id: string;
  tName: string;
};

export default function NewNote() {
  const { createNote, availabelTags } = useNotes();
  //const [selectedOptions, setSelectedOptions] = useState([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [check, setCheck] = useState<Tags[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  console.log(check);
  function handelCheck(e: any, tagid: string, tagname: string) {
    if (e.target.checked) {
      setCheck((prevCheck) => [...prevCheck, { id: tagid, tName: tagname }]);
    } else {
      setCheck((prevCheck) =>
        prevCheck.filter((checktag) => checktag.id !== tagid)
      );
    }
  }
  function handelSumbit(e: FormEvent) {
    e.preventDefault();
    createNote(titleRef.current!.value, bodyRef.current!.value, check);
    navigate("..");
  }
  /* const handleSelectChange = (event:any) => {
      let selectedValues:any
      console.log(event.target)
      console.log(event.target.selectedOptions)
      selectedValues = Array.from(event.target.selectedOptions, (option:any) => option.value);
      console.log(selectedValues)
     // setSelectedOptions(selectedValues);
    };*/

  return (
    <>
      <span className="text-2xl font-bold mx-1.5	my-1.5">New Note</span>
      <form onSubmit={handelSumbit} className="mx-1.5	my-1.5">
        <div className="flex ">
          <div className="flex flex-col w-2/4 ">
            <label htmlFor="title">Title</label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
            />
          </div>
          <div className="flex flex-col w-2/4 ml-2">
          <span>Tags</span>
            <div className="relative">
            <div className="input-span flex">
              {check.map((checked) => (
                <span key={checked.id}>
                  <span>{checked.tName},</span>
                </span>   
              ))}
              <button type="button" onClick={() => setToggle(!toggle)} className="ml-auto ">🔽</button>  
            </div>      
              <div className={`h-12 w-full absolute overflow-y-scroll  ${toggle ?  "" : "invisible"}`}>
                {availabelTags.map((tag) => (
                  <div key={tag.id}>
                    <input
                      onChange={(e) => handelCheck(e, tag.id, tag.tName)}
                      type="checkbox"
                      name="tag"
                      id="tag"
                    />
                    <label htmlFor="tag" className="ml-1">{tag.tName}</label>
                  </div>
                ))}
              </div>
            
            </div>
          </div>
        </div>
        <div className="flex flex-col my-1.5">
          <textarea
            ref={bodyRef}
            name="body"
            id="body"
            cols={30}
            rows={10}
            placeholder="Type Here..."
            required
          />
          <div className="self-end my-1.5">
            <NavLink
              to="/"
              className=" py-1.5 px-1.5 text-black bg-white border rounded border-black border-solid hover:bg-gray-700 hover:text-white"
            >
              <button>Back</button>
            </NavLink>
            <button
              type="submit"
              className=" ml-2 py-1.5 px-1.5 text-white bg-sky-400 border rounded border-solid border-transparent hover:bg-white hover:text-sky-400 hover:border-black"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
