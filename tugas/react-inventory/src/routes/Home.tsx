import { FC } from "react";
import MangaList from "../lib/components/bookshelft/MangaList";
import TagsList from "../lib/components/navigation/TagsList";

const Home: FC<{}> = () => {
  return <div className="flex flex-col">
    <div className="relative overflow-hidden">
      <img className="w-full" src="https://mrwallpaper.com/images/high/one-piece-desktop-manga-panels-08t6bf9qk4odjpc8.webp" alt="hero" />
      <div className="h-fit w-fit absolute inset-0 m-auto bg-slate-800 rounded-3xl shadow-black shadow-md animate-bounce">
        <div className="text-5xl font-comic text-center p-5 max-sm:p-1 max-sm:text-2xl relative">
          <img className="absolute bottom-[9.5rem] left-0 shadow-md max-lg:hidden" src="https://listen.moe/images/girls/kanna.gif" alt="kanna" />
          <h1 className="font-bold border-b-slate-50 border-b-2 py-2">やおいマンガショップ</h1>
          <h2>Manga<span className="text-rose-500">.js</span></h2>
        </div>
      </div>
    </div>
    <br />
    <TagsList />
    <br />
    <MangaList />
  </div>
}
export default Home;
