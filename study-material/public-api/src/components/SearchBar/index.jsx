function SearchBar({ search, setSearch, setPage }) {
  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        setPage(1);
      }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search Tokusatsu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
