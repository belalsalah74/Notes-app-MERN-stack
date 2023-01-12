import { useState, useEffect, useContext } from "react";

function Pagination(props) {
  const currentPage = props.currentPage;
  const pageCount = props.pageCount;
  const paginationList = [
    currentPage > 1 && currentPage - 1,
    currentPage,
    currentPage + 1,
  ];

  const [pageClasses, setPageClasses] = useState("nav-link");

  function getPrevious() {
    props.setCurrentPage((p) => (p > 1 ? p - 1 : p));
  }
  function getNext() {
    props.setCurrentPage((p) => (p <= pageCount ? p + 1 : p));
  }

  function setPageNumber(number) {
    props.setCurrentPage(number);
  }
  return (
    <nav className="nav nav-pills nav-fill">
      <ul className="pagination my-3 mx-auto fs-4">
        <li className="nav-item ">
          <button
            className={
              currentPage === 1 ? `${pageClasses} disabled` : pageClasses
            }
            onClick={getPrevious}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {paginationList.map(
          (i, index) =>
            i >= 1 &&
            i <= pageCount && (
              <li className="nav-item" key={index}>
                <button
                  className={
                    currentPage === i ? `${pageClasses} active` : pageClasses
                  }
                  onClick={() => setPageNumber(i)}
                >
                  {i}
                </button>
              </li>
            )
        )}

        <li className="nav-item">
          <button
            className={
              currentPage === pageCount
                ? "nav-link disabled"
                : "nav-link"
            }
            aria-label="Next"
            onClick={getNext}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
