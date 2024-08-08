import React from "react";
import { SearchAnimeResponse } from "../../libs/Jikan";
import { LoadingContainer } from "../misc/Loading";
import { NotFoundContainer } from "../misc/NotFound";
import { Card } from "./Card";

export const Page: React.FC<{
  jikan: SearchAnimeResponse | null;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelect: React.Dispatch<React.SetStateAction<number>>;
}> = ({ jikan, setModal, setSelect }) => {
  return (
    <div className="page-container">
      <div className="page-box">
        {
          !jikan
          ? <LoadingContainer/>
          : !jikan.data.length
          ? <NotFoundContainer /> 
          : jikan.data.map(
          ((x, i) => 
            (<Card
              image={x.images.webp.image_url}
              name={x.title}
              key={i}
              className={i === jikan.data.length - 1 ? "last" : ""}
              onClick={_ => { setModal(true); setSelect(i) } }
            />)
          ))
        }
      </div>
    </div>
  );
}
