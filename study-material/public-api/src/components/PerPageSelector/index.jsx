function PerPageSelector({ perPage, setPerPage, setPage }) {
  return (
    <div className="per-page-selector">
      <label>Show: </label>
      <select
        value={perPage}
        onChange={(e) => {
          setPerPage(Number(e.target.value));
          setPage(1);
        }}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default PerPageSelector;
