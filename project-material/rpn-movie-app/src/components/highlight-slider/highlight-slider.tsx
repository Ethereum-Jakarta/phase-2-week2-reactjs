import { TMovieData } from "@/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCards } from "swiper/modules"

import "swiper/css"
import "swiper/css/effect-cards"
import { BASE_TMDB_IMAGE_URL, MOVIE_BACKDROP_SIZE } from "@/config"

export const HighlightSlider = ({ movieData }: { movieData: TMovieData[] }) => {
  return (
    <>
      <Swiper
        className="mb-20 shadow-[#43B2E2]/15 shadow-2xl rounded-2xl"
        centeredSlides
        loop
        loopAdditionalSlides={3}
        effect="cards"
        cardsEffect={{
          rotate: false,
          perSlideOffset: 15,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        initialSlide={Math.floor(Math.random() * 8)}
        modules={[Autoplay, EffectCards]}
      >
        {movieData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="absolute w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
            <img
              src={`${BASE_TMDB_IMAGE_URL}/${MOVIE_BACKDROP_SIZE}/${slide.backdrop_path}`}
              alt={`${slide.original_title} backdrop image`}
              loading="lazy"
            />
            <div className="absolute bottom-0 px-6 mb-6 text-white">
              <p className="text-2xl mb-3 font-bold">{slide.original_title}</p>
              <p className="hidden md:block">{slide.overview}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
