import { BASE_TMDB_IMAGE_URL, MOVIE_POSTER_SIZE } from "@/config"
import { TCast, TMovieData } from "@/types"

const Card = ({ data }: { data: TCast }) => {
  const imgUrl = data.profile_path
    ? `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${data.profile_path}`
    : "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon&w=250&h=250&c=7"
  return (
    <div
      id="card"
      className="w-full h-[15rem] rounded-xl relative overflow-hidden mb-5"
    >
      <img
        src={imgUrl}
        alt={`${data.name} image`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full h-fit bg-custom-gray backdrop-blur-sm text-white  font-semibold flex align-middle items-center px-4 py-2 text-sm justify-center">
        <span className="italic">{data.name}</span>
      </div>
    </div>
  )
}

export function CastList({ castData }: any) {
  return (
    <div className="w-full h-auto gap-4 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] relative overflow-hidden py-8">
      {castData?.map((_: TCast) => (
        <Card data={_} />
      ))}
    </div>
  )
}
