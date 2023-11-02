import React, { useContext } from "react";
import noteContext from "../components/context/Notes/noteContext";

export default function Notes_card(props) {
  const context = useContext(noteContext);
  const { deleteNote  } = context;

  return (
    
    <div className="col-md-3">
      
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <i className="fa-solid fa-trash fa-shake fa-lg mx-2 " onClick={()=>{deleteNote(props.note._id)}}></i>
          <i className="fa-solid fa-pen-to-square fa-lg mx-2" onClick={()=>props.updateNote(props.note)}></i>
        </div>
      </div>
    </div>
  );
}
