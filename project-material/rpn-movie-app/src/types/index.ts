export type TMovieData = {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[] | []
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type TGenreData = {
  id: number
  name: string
}

export type TDetailMovie = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    backdrop_path: string
    id: number
    name: string
    poster_path: string
  }
  budget: number
  credits: { cast: TCast[]; crew: TCrew[] }
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  imdb_id: string
  original_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: TProductionCompanies[]
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: { english_name: string; iso_639_1: string; name: string }
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type TCast = {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string
}

export type TCrew = {
  adult: boolean
  credit_id: string
  department: string
  gender: number
  id: number
  job: string
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

export type TProductionCompanies = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}
