import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
 const notesInitial = [
  {
    "_id": "66cf4f11de54f9932555ceba",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1724862225886",
    "__v": 0
  },
  {
    "_id": "66db013124e8b351f0e7a60b",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "66db013124e8b351f0e7a60b",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "66db013124e8b351f0e7a60b",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "66db013124e8b351f0e7a60b",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
  {
    "_id": "66db013124e8b351f0e7a60b",
    "user": "66cef4839f3999fc031077ed",
    "title": "My title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "1725628721063",
    "__v": 0
  },
] 
const [notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
