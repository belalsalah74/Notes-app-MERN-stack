import { Link } from "react-router-dom";
import { AppContext } from "../Context";

import { useContext } from "react";
function Note() {
  const [note] = useContext(AppContext);

  return (
    <>
      <div className="col">
        <Link
          to={{ pathname: `/${note._id}` }}
          state={note}
          className="card note bg-transparent border border-secondary border-1 shadow-sm  reset-link"
        >
          <div className="card-body">
            <p className="lead text white">{note.body.slice(0, 50)}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Note;
