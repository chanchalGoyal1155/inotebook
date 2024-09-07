import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
 const notesInitial = [
  {
    "_id": "66cf4f11de954f9932555ceba",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1724862225886",
    "__v": 0
  },
  {
    "_id": "66db3013124e8b351f0e7a60b1",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "66dgb013124e8b351f0e7a60b2",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "636db013124e8b351f0e7a60b3",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "66db013124e84b351f0e7a60b4",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "66db0123124e8b351f0e7a60b5",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
] 
const [notes, setNotes] = useState(notesInitial)

//add a note
const addNote =(title,description,tag)=>{
  //TODO: API Call
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
  setNotes(notes.concat(note))

}
//delete a note
const deleteNote =()=>{
  
}
//edit a note
const editNote =()=>{
  
}
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
