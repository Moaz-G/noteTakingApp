import { useParams , Link ,useNavigate } from "react-router-dom"
import { useNotes } from "../context/NotesContext"
import "../shadow.css";



export default function Note() {
  const {notes , deleteNote} = useNotes()
  const navigate = useNavigate()
  const params = useParams()
  const {id} = params
  console.log(id)
  let note
  note = notes.find((note) => note.id == id)
  console.log(note)
  if (note == undefined) {return (<div>Note Not Found</div>)}
  function handelDelete (){
    deleteNote(id)
    navigate("..")
  }
  return (
    <>
    <div className="flex ">
    <div>
    <div className=" ml-1 mb-1 text-2xl font-bold ">{note.title}</div>
    <>{note.tags.map((tag) =><span key={tag.id} className=" ml-1 py-0.5 px-0.5 text-white bg-sky-400 border rounded border-solid border-transparent">{/*tag.id*/}{tag.tName}</span>)} </>
    </div>
     <div className="ml-auto mt-1">
      <button className=" py-1.5 px-1.5 text-black bg-white border rounded border-black border-solid hover:bg-gray-700 hover:text-white"><Link to="/" >Back</Link></button>
      <button className=" ml-1 mr-1 py-1.5 px-1.5 text-black bg-white border rounded border-black border-solid hover:bg-gray-700 hover:text-white"><Link to={`/edit/${note.id}`} >Edit</Link></button>
      <button onClick={handelDelete} className=" mr-1 py-1.5 px-1.5 text-red-500 bg-white border rounded border-red-500 border-solid">Delete</button>
    </div>
    </div>
    {/*<div>ID: {note.id}</div>*/}
    <div className=" m-2 input-span h-screen">BODY: {note.body}</div>
    </>
  )
}

