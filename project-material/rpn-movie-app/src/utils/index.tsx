import { TGenreData } from "@/types"
import { useState } from "react"

export function Dropdown({ genreData, movieGenreData, funcGenre }: any) {
  const [genre, setGenre] = useState("")
  const handleOnClick = (val: any) => {
    setGenre(val.name)
    funcGenre(val)
    document.getElementById("dropdown")?.removeAttribute("open")
  }
  return (
    <details
      id="dropdown"
      className="dropdown dropdown-bottom dropdown-end z-20"
    >
      <summary className="btn m-1">
        {movieGenreData.length === 0 ? "Genre" : genre}
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <div className="flex flex-col h-52 overflow-y-auto">
          {genreData.map((_: any) => (
            <li key={_.id} onClick={() => handleOnClick(_)}>
              <a>{_.name}</a>
            </li>
          ))}
        </div>
      </ul>
    </details>
  )
}

export function BtnResetDropdown({ funcReset }: any) {
  return (
    <button
      className="btn btn-square bg-transparent border-none"
      onClick={funcReset}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}

export const genres: any = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}
