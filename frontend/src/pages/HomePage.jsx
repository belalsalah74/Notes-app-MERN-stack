import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AppContext } from "../Context";
import Pagination from "../components/Pagination";
import { Navigate } from "react-router-dom";

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const { url, token } = useContext(AppContext);

  useEffect(() => {
    fetchNotes();
  }, [currentPage]);

  async function fetchNotes() {
    const { data } = await Axios.get(`${url}/notes?page=${currentPage}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    setNotes(data.data);
    setPageCount(data.count);
  }

  return (
    <>
      {token ? (
        <div className="mainContent">
          <NoteForm fetchNotes={fetchNotes} />
          <NoteList notes={notes} setNotes={setNotes} url={url} />
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export default HomePage;
