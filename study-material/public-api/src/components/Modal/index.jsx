import { IMAGE_BASE_URL } from "../../constants";
import DownloadButton from "../DownloadButton";

function Modal({ modalData, setShowModal }) {
  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowModal(false)}>
          ✖
        </button>
        <img
          src={`${IMAGE_BASE_URL}/${modalData.img}`}
          alt={modalData.name}
          className="modal-image"
        />
        <h2 className="modal-title">{modalData.name}</h2>
        <p>
          <strong>Category: </strong> {modalData.category?.name || "Unknown"}
        </p>
        <DownloadButton
          imageUrl={`${IMAGE_BASE_URL}${modalData.img}`}
          fileName={modalData.name}
        />
      </div>
    </div>
  );
}

export default Modal;
