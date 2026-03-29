import { Breadcumb, DetailMovie } from "@/components"
import { useParams } from "react-router-dom"

export function Detail() {
  const params = useParams()

  return (
    <div className="bg-base-color min-h-[100vh] h-auto w-[100%]">
      <div className="w-4/5 lg:max-w-[65rem] mx-auto relative py-10 flex justify-center flex-col">
        <DetailMovie params={params.movieId} />
      </div>
    </div>
  )
}
