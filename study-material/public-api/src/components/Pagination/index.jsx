function Pagination({ page, totalPages, prevPage, nextPage, setPage }) {
  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => prevPage && setPage(page - 1)}
        disabled={!prevPage}
      >
        Prev
      </button>
      <span className="page-info">
        Page {page} of {totalPages}
      </span>
      <button
        className="page-button"
        onClick={() => nextPage && setPage(page + 1)}
        disabled={!nextPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
