import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
 const notesInitial = [] 
const [notes, setNotes] = useState(notesInitial)

//get all note
const getNotes = async ()=>{
   //API Call
   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZWY0ODM5ZjM5OTlmYzAzMTA3N2VkIn0sImlhdCI6MTcyNDg1NDUyNn0.MwAEANeVBlTswwWqtV2WvJvzFtJh2LsSuJJSh2S9rfg"
    },
  });
  const json = await response.json ()
console.log(json) 
setNotes(json)
}
//add a note
const addNote = async (title,description,tag)=>{
  //TODO: API Call
   //API Call
   const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZWY0ODM5ZjM5OTlmYzAzMTA3N2VkIn0sImlhdCI6MTcyNDg1NDUyNn0.MwAEANeVBlTswwWqtV2WvJvzFtJh2LsSuJJSh2S9rfg"
    },
    body: JSON.stringify({title, description, tag})
  });
 
  
  console.log("Adding a new note")
  const note = {
    "_id": "66db0123124e8b351f0e7a60b5",
    "user": "66cef4839f3999fc031077ed2",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "1725628721063",
    "__v": 0
  }
  setNotes(notes.concat(note));
}


//delete a note
const deleteNote = async (id)=>{
  //API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZWY0ODM5ZjM5OTlmYzAzMTA3N2VkIn0sImlhdCI6MTcyNDg1NDUyNn0.MwAEANeVBlTswwWqtV2WvJvzFtJh2LsSuJJSh2S9rfg"
    },
  });
  const json =  response.json();
  console.log(json)
  
  console.log("Deleting the note with id "+id);
  const newNotes = notes.filter((note)=>{ return note._id!==id });
  setNotes(newNotes);
}

//edit a note
const editNote = async(id, title, description, tag) => {
  //API Call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZWY0ODM5ZjM5OTlmYzAzMTA3N2VkIn0sImlhdCI6MTcyNDg1NDUyNn0.MwAEANeVBlTswwWqtV2WvJvzFtJh2LsSuJJSh2S9rfg"
    },
    body: JSON.stringify({title, description, tag})
  });
  const json =  response.json();
  
  // Logic to edit in client
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }
}

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
