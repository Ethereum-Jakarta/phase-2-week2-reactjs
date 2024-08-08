import { BiX, BiCalendar, BiStar, BiStats, BiTv } from "react-icons/bi";
import { AnimeDataItem } from "../../libs/Jikan";

export const Modal: React.FC<{
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  anime?: AnimeDataItem;
  state: boolean;
}>
= ({ setState, state, anime }) => {
  if (!anime) return <></>;
  return (
    <div
      className="modal-container"
      style={{ display: state ? "inherit" : "none" }}>
      <div className="modal-box">
        <div className="modal-hero">
          <img src={anime?.images.webp.large_image_url} alt={anime?.title}/>
        </div>
        <div className="modal-content">
          <div className="modal-header">
            <div className="title">
              <h1>{anime?.title}</h1>
              <h2>{anime?.title_japanese}</h2>
            </div>
            <BiX color="#e8a0b4" size={40} className="modal-close" onClick={_ => setState(false)} style={{cursor: "pointer"}} />
          </div>
          <div className="tldr">
            {anime?.synopsis || anime?.background || "no synopsis" }
          </div>
          <table className="modal-content-table">
            <thead>
              <tr>
                <th><BiCalendar /><span>Aired</span></th>
                <th><BiStar /><span>Rating</span></th>
                <th><BiStats /><span>Status</span></th>
                <th><BiTv /><span>Type</span></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>{anime?.aired.string}</td></tr>
              <tr><td>{anime?.rating}</td></tr>
              <tr><td>{anime?.status}</td></tr>
              <tr><td>{anime?.type}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
