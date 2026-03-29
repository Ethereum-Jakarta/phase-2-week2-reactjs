import { HighlightSlider, MovieList, Footer } from "@/components"
import { Navbar } from "@/components/navbar"
import { getDiscoverMovies, getGenreMovies } from "@/modules/movies"
import { TGenreData, TMovieData } from "@/types"
import { BtnResetDropdown, Dropdown } from "@/utils"
import { useEffect, useState } from "react"

export function Root() {
  const [movieData, setMovieData] = useState<TMovieData[]>([])
  const [genreData, setGenreData] = useState<TGenreData[]>([])
  const [movieGenreData, setMovieGenreData] = useState<TMovieData[]>([])
  const [loading, setLoading] = useState(false)
  const [firstRender, setFirstRender] = useState(false)
  const [page, setPage] = useState<number>(1)

  const funcGetDiscoverMovie = async (page: number) => {
    setLoading(true)
    const res = await getDiscoverMovies(page)
    setMovieData([...movieData, ...res.results])
    setLoading(false)
  }

  const funcGetGenre = async () => {
    const res = await getGenreMovies()
    setGenreData(res.genres)
  }

  const funcSeeMore = () => {
    funcGetDiscoverMovie(page + 1)
    setPage(page + 1)
  }

  const funcSelectedGenre = (val: any) => {
    const tempMovieGenreData = movieData.filter((_: any) =>
      _?.genre_ids.includes(val.id)
    )
    setMovieGenreData(tempMovieGenreData)
  }

  const funcResetGenre = () => {
    document.getElementById("dropdown")?.removeAttribute("open")
    setMovieGenreData([])
  }

  useEffect(() => {
    if (!firstRender) {
      funcGetGenre()
      funcGetDiscoverMovie(page)
      setFirstRender(true)
    }
  }, [])
  return (
    <div className="bg-slate-950 min-h-[100vh] h-auto w-[100%]">
      <div className="w-4/5 lg:max-w-[65rem] mx-auto relative py-10 flex justify-center flex-col">
        {loading ? (
          <>Loading...</>
        ) : (
          <div className="overflow-x-hidden w-full min-h-[200px] md:min-h-[300px] lg:min-h-[430px]">
            <HighlightSlider movieData={movieData?.slice(0, 10)} />
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-3xl font-bold text-white ">Movies</span>
          <div className="flex gap-2 items-center">
            {movieGenreData.length !== 0 && (
              <BtnResetDropdown funcReset={funcResetGenre} />
            )}
            <Dropdown
              genreData={genreData}
              movieGenreData={movieGenreData}
              funcGenre={funcSelectedGenre}
            />
          </div>
        </div>
        <MovieList
          movieData={movieGenreData.length === 0 ? movieData : movieGenreData}
        />
        {loading ? (
          <span className="loading loading-spinner loading-md mx-auto"></span>
        ) : (
          <button className="btn w-fit mx-auto" onClick={funcSeeMore}>
            {loading ? "Loading..." : "See More"}
          </button>
        )}
      </div>
    </div>
  )
}
