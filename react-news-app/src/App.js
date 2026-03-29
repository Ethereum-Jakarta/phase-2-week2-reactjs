import {useState} from 'react'
import Navbar from "./components/Navbar";
import NewsBoard from "./components/NewsBoard";
import SearchResults from "./components/SearchResults";


const App = () => {
  const [category, setCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("");

  return (
      <div>
          <Navbar setCategory={setCategory} setSearchQuery={setSearchQuery} />
          {searchQuery ? (
              <SearchResults query={searchQuery} />
          ) : (
              <NewsBoard category={category} />
          )}
      </div>
  );
}

export default App;