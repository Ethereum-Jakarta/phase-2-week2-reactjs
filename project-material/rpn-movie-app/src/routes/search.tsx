import { MovieList } from "@/components"
import { getSearchKeyword } from "@/modules/movies"
import { TMovieData } from "@/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function Search() {
  const [searchData, setSearchData] = useState<TMovieData[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const params: any = useParams()

  const getSearchKeywordData = async () => {
    setLoading(true)
    const res = await getSearchKeyword(params.keyword, page)
    setSearchData(res.results)

    setLoading(false)
  }

  useEffect(() => {
    getSearchKeywordData()
  }, [params.keyword])

  return loading ? (
    <div className="w-full h-[80vh] flex justify-center align-middle">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : searchData.length !== 0 ? (
    <div className="bg-base-color min-h-[100vh] h-auto w-[100%]">
      <div className="w-4/5 lg:max-w-[65rem] mx-auto relative py-10 flex justify-center flex-col">
        <MovieList movieData={searchData} />
      </div>
    </div>
  ) : (
    <div className="w-full h-[80vh] flex justify-center align-middle items-center">
      <div className="text-white text-3xl">NO DATA</div>
    </div>
  )
}
