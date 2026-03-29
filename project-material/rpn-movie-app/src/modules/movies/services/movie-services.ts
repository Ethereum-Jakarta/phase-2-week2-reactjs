import { httpClient } from "@/http"

export const getDiscoverMovies = async (page: number) => {
  return await httpClient
    .get("discover/movie", {
      searchParams: {
        page,
        sort_by: "popularity.desc",
        "vote_average.gte": 5,
        "vote_count.gte": 100,
      },
    })
    .json<any>()
}

export const getGenreMovies = async () => {
  return await httpClient.get("genre/movie/list?language=en").json<any>()
}

export const getDetailMovie = async (id: string) => {
  return await httpClient
    .get(`movie/${id}?append_to_response=credits&language=en-US`)
    .json<any>()
}

export const getSearchKeyword = async (keyword: string, page: number) => {
  return await httpClient
    .get(
      `search/movie?${keyword}&include_adult=false&language=en-US&page=${page}`
    )
    .json<any>()
}
