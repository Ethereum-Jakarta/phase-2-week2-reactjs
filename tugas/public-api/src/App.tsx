import React, { useEffect, useState } from "react";
import "./App.css";
import { Modal } from "./components/interfaces/Modal";
import { Page } from "./components/interfaces/Page";
import { Navbar } from "./components/navigation/Navbar";
import { searchAnime, SearchAnimeResponse } from "./libs/Jikan";

const App: React.FC<{}> = () => {
  const [isInit, setInit] = useState(true);
  const [jikan, setJikan] = useState(null as SearchAnimeResponse | null);
  const [isModal, setModal] = useState(false);
  const [select, setSelect] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null as null | string);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (page === -1) return setPage(1);
    if (isInit) {
      setInit(false);
      return;
    }
    setJikan(null);
    searchAnime(query ?? undefined, page).then(x => {
      setJikan(x);
      setTotalPage(x.pagination?.items?.total);
    }).catch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit, page]);

  const runSearch = async () => {
    setPage(-1);
  }

  return (
    <div className="App">
      <Navbar
        page={page}
        max={totalPage}
        setPage={setPage}
        setQuery={setQuery}
        runSearch={runSearch}
      />
      <Page
        jikan={jikan}
        setModal={setModal}
        setSelect={setSelect}
      />
      <Modal
        setState={setModal}
        state={isModal}
        anime={jikan?.data?.[select]}
      />
    </div>
  );
}

export default App;
