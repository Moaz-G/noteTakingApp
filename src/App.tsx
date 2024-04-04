import { Routes, Route } from "react-router-dom";
import NewNote from "./components/NewNote";
//import EditNote from "./components/EditNote";
import NoteList from "./components/NoteList";
import {NotesContextProvider} from "./context/NotesContext";
import Note from "./components/Note";
import EditNote from "./components/EditNote";
import FOUROFOUR from "./components/FOUROFOUR";

function App() {
  
  return (
      <NotesContextProvider>
      <Routes>
          <Route path="/" element={<NoteList /> } />
          <Route path="/newnote" element={<NewNote />} />
          <Route path="/:id" element={<Note /> } />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="*" element={<FOUROFOUR />} />
      </Routes>
      </NotesContextProvider>
  );
}

export default App;
