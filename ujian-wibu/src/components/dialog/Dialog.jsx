import { useEffect, useState } from "react";
import CloseDialog from "../button/CloseDialog";
import Timer from "../Timer";
import NextButton from "../button/NextButton";
import { getRandomAnime } from "../../api/api";
import { Loader } from "../loader/ShuffleLoader";
import Finish from "./Finish";

const Dialog = ({ isOpen, setIsOpen }) => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);
  useEffect(() => {
    if (counter <= 10) {
      const getAnimeData = async () => {
        setLoading(true);
        try {
          const animeData = await getRandomAnime();
          setAnimeData(animeData || null);
        } catch (error) {
          console.error("Failed to fetch Anime data", error);
        } finally {
          setLoading(false);
        }
      };
      getAnimeData();
    }
  }, [counter]);

  const handleCounter = () => {
    if (counter <= 10) {
      setCounter((prev) => prev + 1);
    }
  };

  const handleUserAnswer = () => {
    const isMatch =
      userInput.trim().toLowerCase() === animeData.title.trim().toLowerCase();

    if (counter <= 10) {
      if (isMatch) {
        setUserAnswer((prev) => [
          ...prev,
          { image_url: animeData.image_url, correct: true },
        ]);
      } else {
        setUserAnswer((prev) => [
          ...prev,
          {
            image_url: animeData.image_url,
            correct: false,
            userInput,
            title: animeData.title,
          },
        ]);
      }
    }
  };
  const handleNext = (e) => {
    e && e.preventDefault();
    handleUserAnswer();
    handleCounter();
    setUserInput(""); //
  };

  if (loading) return <Loader />;
  if (counter >= 11)
    return <Finish setIsOpen={setIsOpen} userAnswer={userAnswer} />;

  return (
    <div className="bg-white rounded h-[448px] w-[768px] z-10 fixed drop-shadow-md ">
      <Timer onComplete={handleNext} />
      <button
        onClick={() => setIsOpen2(true)}
        className="bg-gradient-to-r absolute top-3 right-2 from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        X
      </button>
      {isOpen2 && (
        <CloseDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
        />
      )}
      {/* Image */}
      <div
        className="h-[224px] w-[268px] bg-white mx-auto mt-1 shadow-lg
      "
      >
        <img src={animeData?.image_url} className="w-full h-full " />
      </div>
      {/* Form */}
      <form
        onSubmit={handleNext}
        className="flex flex-col items-center justify-center gap-4 mt-2 "
      >
        <h2 className="text-center font-bold"> Anime apakah ini?</h2>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Masukkan nama anime..."
          className="text-center border-2 border-black rounded-md p-2"
        />
        <div className="flex items-end h-[10%] flex-wrap justify-end gap-4 p-2 absolute right-0 bottom-0 mb-2 ">
          <p className="my-auto">{counter <= 10 ? counter : 10}/10</p>
          <NextButton>{counter !== 10 ? "NEXT" : "FINISH"}</NextButton>
        </div>
      </form>
    </div>
  );
};

export default Dialog;
