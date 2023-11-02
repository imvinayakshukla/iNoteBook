import React, { useContext,useState } from "react";
import noteContext from "../components/context/Notes/noteContext";
export const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;


  const [note, setNote] = useState({title:"",description:"",tag:""})

  const handleOnchange = (e) => {
    setNote({...note,[e.target.id]:e.target.value})
  };

  const handleOnclick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag)

  };
  return (
    <div>
      <form className="mb-3 ">
        <h2>Add a Notes</h2>
        <div className="mb-3 ">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={handleOnchange}
            type="text"
            className="form-control"
            id="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={handleOnchange}
            type="text"
            className="form-control"
            id="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Tag
          </label>
          <input
            onChange={handleOnchange}
            type="text"
            className="form-control"
            id="tag"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleOnclick}
        >
          Add a Note
        </button>
      </form>
    </div>
  );
};
