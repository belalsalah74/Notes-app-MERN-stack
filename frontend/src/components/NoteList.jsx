import Note from "./Note";
import { AppContext } from "../Context";
function GetNotes(props) {
  const notes = props.notes;
  const url = props.url;
 
  
  return (
    <>
      <div className="row   g-2 justify-content-evenly">
        {notes.map((note) => {
          return (
            <AppContext.Provider value={[note, url]} key={note._id}>
              <Note />
            </AppContext.Provider>
          );
        })}
      </div>
    </>
  );
}

export default GetNotes;
