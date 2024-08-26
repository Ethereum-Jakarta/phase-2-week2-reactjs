import { BASE_TMDB_IMAGE_URL, MOVIE_POSTER_SIZE } from "@/config"
import { TMovieData } from "@/types"
import { genres } from "@/utils"
import { Link } from "react-router-dom"

const Card = ({ data }: { data: TMovieData }) => {
  const imgUrl = data.poster_path
    ? `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${data.poster_path}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSWSxsVpAmqb_T7CLGolJ193Bw9xh7X7r0yQ&s"

  return (
    <Link to={`/movie/${data.id}`}>
      <div
        id="card"
        className="w-full h-[16rem] rounded-xl relative overflow-hidden mb-5"
      >
        <img
          src={imgUrl}
          alt={`${data.original_title}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1 w-fit m-4 rounded-xl px-2 py-1 bg-[#43B2E2] flex text-white align-middle items-center">
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--twemoji"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#FDFDFE"
              d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379z"
            />
          </svg>
          <span className="ml-[0.1rem] font-bold">
            {data.vote_average.toString().substring(0, 3)}
          </span>
        </div>

        <div className="absolute bottom-1 w-fit h-fit z-10 m-4">
          <div className="text-white  font-semibold">{data.original_title}</div>
          <div className="text-xs font-semibold mt-1">
            {genres[data.genre_ids?.sort()[0]]}
          </div>
        </div>

        <div
          id="card-backdrop"
          className="w-full h-[100%] absolute bottom-0 hidden lg:block"
        ></div>
      </div>
    </Link>
  )
}

export const MovieList = ({ movieData }: { movieData: TMovieData[] }) => {
  return (
    <div className="w-full h-auto gap-4 grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] relative overflow-hidden py-8">
      {movieData.map((e) => (
        <Card data={e} />
      ))}
    </div>
  )
}
