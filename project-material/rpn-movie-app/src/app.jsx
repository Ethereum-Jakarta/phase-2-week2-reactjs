import { Detail, Root } from "./routes"
import { Routes, Route } from "react-router-dom"
import { Search } from "./routes/search"

export default function App() {
  return (
    <div className="min-h-[100vh] bg-base-color">
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/movie/:movieId" element={<Detail />} />
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>
    </div>
  )
}
