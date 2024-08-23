import { BiSearch } from "react-icons/bi";
import { Pagination } from "./Pagination";

export const Navbar: React.FC<{ page: number;
  max: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
  runSearch: () => Promise<void>;
}>
= ({ page, max, setPage, setQuery, runSearch }) => {
  return (
    <nav className="navbar-container">
      <ul className="navbar-box">
        <li className="navbar-header" key={0}>Tokime<span>.ki</span></li>
        <li><Pagination max={max} current={page} setPage={setPage} /></li>
        <li className="navbar-search" key={1}>
          <input
            type="text"
            placeholder="Jujutsu Kaisen..."
            onInput={e => setQuery(e.currentTarget.value.length > 0 ? e.currentTarget.value : null)}
            onKeyDown={e => e.key === "Enter" ? runSearch() : null}
          />
          <BiSearch size={35} className="icon" style={{ cursor: "pointer" }} onClick={_ => runSearch()} />
        </li>
      </ul>
    </nav>
  );
}
