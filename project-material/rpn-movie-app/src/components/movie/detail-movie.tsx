import {
  BASE_TMDB_IMAGE_URL,
  MOVIE_BACKDROP_SIZE,
  MOVIE_POSTER_SIZE,
} from "@/config"
import { getDetailMovie } from "@/modules/movies"
import { TDetailMovie } from "@/types"
import { useEffect, useState } from "react"
import { CastList } from "./cast-list"
import { Breadcumb } from ".."

export function DetailMovie({ params }: { params: any }) {
  const [detailMovie, setDetailMovie] = useState<TDetailMovie | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getDetail() {
      setLoading(true)
      const res = await getDetailMovie(params)
      setDetailMovie(res)
      setLoading(false)
    }
    if (!detailMovie) {
      getDetail()
    }
  }, [])
  return loading ? (
    <div className="w-full h-[80vh] flex justify-center align-middle">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <>
      {/* BREADCRUMB  */}
      <Breadcumb pathName={detailMovie?.original_title} />

      {/* DETAIL  */}
      <div className="w-full h-auto mx-auto  rounded-3xl overflow-hidden relative flex flex-col mt-10">
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] relative">
          <img
            src={`${BASE_TMDB_IMAGE_URL}/${MOVIE_BACKDROP_SIZE}/${detailMovie?.backdrop_path}`}
            className="w-full h-full object-cover"
            alt={detailMovie?.original_title}
          />
          <div
            id="backdrop"
            className="w-full h-[100%] absolute bottom-0 hidden lg:block"
          ></div>
        </div>

        {/* DETAIL MOVIE LG */}
        <div className="lg:h-fit lg:absolute w-[35%] pl-10 flex-col gap-8 top-10 justify-center hidden lg:flex">
          <div
            id="title"
            className="flex text-white text-5xl font-bold h-fit align-middle"
          >
            {detailMovie?.original_title}
          </div>
          <div className=" text-white text-lg font-bold">
            {detailMovie?.original_title}
          </div>
          <div className="text-xs">
            <div>
              <span>Actors: </span>
              <span className="text-[#FDFDFE] text-xs">
                {detailMovie?.credits?.cast
                  .slice(0, 3)
                  .map(
                    (e, i) =>
                      `${e.original_name.split(" ").slice(0, 2).join(" ")}${
                        i !== 2 ? ", " : ""
                      }`
                  )}
              </span>
            </div>
            <div>
              <span>Genres: </span>
              <span className="text-[#FDFDFE] text-xs">
                {detailMovie?.genres.map(
                  (_, i) =>
                    `${_.name}${
                      i === detailMovie.genres.length - 1 ? "" : ", "
                    }`
                )}
              </span>
            </div>
          </div>
          <div className="text-xs text-[#FDFDFE]">{detailMovie?.overview}</div>
        </div>

        <div className="lg:h-fit w-[100%] flex-col gap-4 md:gap-6 lg:gap-8  justify-center flex sm:flex md:flex lg:hidden xl:hidden mt-16">
          <div
            id="title"
            className="flex text-white text-3xl sm:text-4xl md:text-5xl font-bold h-fit align-middle "
          >
            {detailMovie?.original_title}
          </div>
          <div className="text-xs">
            <div>
              <span>Actors: </span>
              <span className="text-[#FDFDFE] text-xs">
                {detailMovie?.credits?.cast
                  .slice(0, 3)
                  .map(
                    (e, i) =>
                      `${e.original_name.split(" ").slice(0, 2).join(" ")}${
                        i !== 2 ? ", " : ""
                      }`
                  )}
              </span>
            </div>
            <div>
              <span>Genres: </span>
              <span className="text-[#FDFDFE] text-xs">
                {detailMovie?.genres.map(
                  (_, i) =>
                    `${_.name}${
                      i === detailMovie.genres.length - 1 ? "" : ", "
                    }`
                )}
              </span>
            </div>
          </div>
          <div className="text-xs text-[#FDFDFE]">{detailMovie?.overview}</div>
        </div>

        {/* CAST  */}
        <span className="text-3xl font-bold text-white mt-10">Cast</span>
        <CastList castData={detailMovie?.credits.cast} />
      </div>
    </>
  )
}
