import { API_BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PerPageSelector from "../components/PerPageSelector";
import Gallery from "../components/Gallery";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData(search, page, perPage);
  }, [search, page, perPage]);

  const fetchData = (query = "", currentPage = 1, itemsPerPage = 10) => {
    setLoading(true);
    setError(null);

    const apiUrl = `${API_BASE_URL}?search=${query}&page=${currentPage}&per_page=${itemsPerPage}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Data fetch failed");
        return response.json();
      })
      .then((result) => {
        setData(result.data);
        setTotalPages(result.pagination?.last_page || 1);
        setNextPage(result.pagination?.next_page_url);
        setPrevPage(result.pagination?.prev_page_url);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Tokusatsu Gallery</h1>

      <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
      <PerPageSelector
        perPage={perPage}
        setPerPage={setPerPage}
        setPage={setPage}
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <Gallery
        data={data}
        setModalData={setModalData}
        setShowModal={setShowModal}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setPage={setPage}
      />

      {showModal && <Modal modalData={modalData} setShowModal={setShowModal} />}
    </div>
  );
}

export default Home;
