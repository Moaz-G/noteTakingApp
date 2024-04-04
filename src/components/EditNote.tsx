import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { FormEvent, useState } from "react";


type Tags = {
  id: string;
  tName: string;
};


export default function EditNote() {
  const {notes,editNote,availabelTags} = useNotes()
  const [toggle, setToggle] = useState<boolean>(false)
  const navigate = useNavigate()
  const params = useParams()
  const {id} = params
  console.log(id)
  let note:any
  note = notes.find((note) => note.id == id)
  console.log(note)
  if (note == undefined) {return (<div>Note Not Found</div>)}
  const [title,setTitle] = useState(note.title)
  const [body,setBody] = useState(note.body)
  const [check, setCheck] = useState<Tags[]>(note.tags);
  const unassociatedTags = availabelTags.filter((tag:any) => !note.tags.some((noteTag:any) => noteTag.id === tag.id));  
  function handelCheck(e: any, tagid: string, tagname: string) {
    if (e.target.checked) {
      setCheck((prevCheck) => [...prevCheck, { id: tagid, tName: tagname }]);
    } else {
      setCheck((prevCheck) =>
        prevCheck.filter((checktag) => checktag.id !== tagid)
      );
    }
  }
  console.log(check)
  
  function handelSumbit (e:FormEvent){
    e.preventDefault()
    editNote(title, body, note.id , check)
    navigate("..")
   }



  return (
    <>
    <span className="text-2xl font-bold mx-1.5	my-1.5">EditNote</span>
    <form onSubmit={handelSumbit} className="mx-1.5	my-1.5">
    <div className="flex ">
    <div className="flex flex-col w-2/4 ">
    <label htmlFor="title">Title</label>
    <input    type="text" name="title" id="title"  value={title} onChange={(e) => setTitle(e.target.value) } required/>
    </div>
    <div className="flex flex-col w-2/4 ml-2">
          <span>Tags</span>
            <div className="relative">
            <div className="input-span flex">
              {check.map((tag:any) => (
                <span key={tag.id}>
                  <span>{/*tag.id*/}{tag.tName},</span>
                </span>   
              ))}
              <button type="button" onClick={() => setToggle(!toggle)} className="ml-auto ">🔽</button>  
            </div>      
              <div className={`h-12 w-full absolute overflow-y-scroll ${toggle ?  "" : "invisible"}`}>
                {note.tags.map((tag:any) => (
                  <div key={tag.id}>
                    <input
                      onChange={(e) => handelCheck(e, tag.id, tag.tName)}
                      type="checkbox"
                      name="tag"
                      id="tag"
                      defaultChecked={true}
                    />
                    <label htmlFor="tag" className="ml-1">{tag.tName}</label>
                  </div>
                ))}
                {unassociatedTags.map((tag:any) => (
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
    <textarea  name="body" id="body" cols={30} rows={10} value={body} onChange={(e) => setBody(e.target.value) } required />
    <div className="self-end my-1.5">
      <NavLink to="/" className=" py-1.5 px-1.5 text-black bg-white border rounded border-black border-solid hover:bg-gray-700 hover:text-white"><button>Back</button></NavLink>
      <button type="submit"  className=" ml-2 py-1.5 px-1.5 text-white bg-sky-400 border rounded border-solid border-transparent hover:bg-white hover:text-sky-400 hover:border-black">Save</button>
    </div>
    </div>
    </form>
    </>
  )
}
