import {  useRef, useState } from "react";
import { useNotes } from "../context/NotesContext";
import "../shadow.css"



export default function TagModal() {
    const [edit ,setEdit] = useState([false , "" ])
    const {createTags , deleteTags , editTags , availabelTags} = useNotes()
    const titleRef = useRef<HTMLInputElement>(null)
    
     let editTag = availabelTags.filter((tag) => tag.id == edit[1] )
    
 
    function handelSumbit1 (e:any){
        e.preventDefault()
        createTags(titleRef.current!.value)
        }

        function handelSumbit2 (e:any){
        e.preventDefault()
        editTags(titleRef.current!.value, editTag[0].id)
        setEdit([false , "" ])
        }
    

  return (
    <>
    <div className="text-2xl font-bold ">TagModal</div>
    <form onSubmit={handelSumbit1}>
    {/* <button onClick={(e:FormEvent) => e.target}>Create</button> */}
    { !edit[0] && 
    <div>
    <div className="flex mt-2">
    <input ref={titleRef} type="text" name="tag" id="tag" placeholder="Create New Tag" className="w-full" required />
    <button type="submit" name="create" className=" ml-2 py-1.5 px-1.5 text-white bg-sky-400 border rounded border-solid border-transparent hover:bg-white hover:text-sky-400 hover:border-black">Create</button>
    </div>
    <div className="h-60 overflow-y-scroll ">
    {availabelTags.map((tag) =>  
    <div key={tag.id} className="mt-2 flex">
    {/*<div>{tag.id}-{tag.tName}</div>*/}
    <button onClick={() => setEdit([true , tag.id ])}>✏</button>
    <div className="w-full ml-2 mr-2 input-span">{tag.tName}</div>
    <button onClick={() => deleteTags(tag.id)} className="px-1.5 text-red-500 bg-white border rounded border-red-500 border-solid">❌</button>
    </div>
    )} 
    </div> 
    </div>  
    }
    </form>
    <form onSubmit={handelSumbit2}  className="flex">
    { edit[0] && 
    <>
    <input ref={titleRef} type="text" name="tag" id="tag"  defaultValue={editTag[0].tName} className="w-full"/>
    <button type="submit" name="edit" className="ml-2" >Update</button>
    </>
    }
    </form> 
    </>
  )
}
