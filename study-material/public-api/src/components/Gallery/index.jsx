import { IMAGE_BASE_URL } from "../../constants";

function Gallery({ data, setModalData, setShowModal }) {
  return (
    <div className="toku-grid">
      {data.length > 0 ? (
        data.map((toku) => (
          <div
            className="toku-card"
            key={toku.id}
            onClick={() => {
              setModalData(toku);
              setShowModal(true);
            }}
          >
            <img
              src={`${IMAGE_BASE_URL}/${toku.img}`}
              alt={toku.name}
              className="toku-image"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/200")
              }
            />
          </div>
        ))
      ) : (
        <p className="no-results">No results.</p>
      )}
    </div>
  );
}

export default Gallery;
