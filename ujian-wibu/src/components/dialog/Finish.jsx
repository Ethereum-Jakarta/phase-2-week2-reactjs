import React, { useEffect, useState } from "react";
import NextButton from "../button/NextButton";

const Finish = ({ setIsOpen, userAnswer }) => {
  const [score, setScore] = useState(0);
  // Calculate Final Score
  useEffect(() => {
    const correctAnswer = userAnswer.filter((e) => e.correct).length;
    setScore(correctAnswer * 10);
    localStorage.setItem("score", score);
  }, [userAnswer, score]);

  return (
    <div className="bg-white rounded min-h-[448px] w-[768px] max-h-screen overflow-auto  z-10 fixed drop-shadow-md ">
      <h1 className="text-center font-bold text-lime-600 text-4xl mt-2">
        Final Score
      </h1>
      <div className="flex flex-col flex-wrap justify-center items-center gap-4 mt-2 w-full p-4 max-h-screen overflow-auto">
        {userAnswer &&
          userAnswer.map((e, i) => (
            <div key={i} className="flex flex-col items-center gap-2 ">
              <img src={e.image_url} className="w-[64px] h-[68px] " />
              <p
                className={`text-center font-bold  text-sm ${
                  e.correct ? "text-green-500" : "text-red-500"
                }`}
              >
                {e.correct ? "CORRECT" : "WRONG"}
              </p>
              <p className="text-center font-bold text-lime-600 text-sm">
                {e.title}
              </p>
            </div>
          ))}
      </div>
      <div className="flex items-end h-[10%] flex-wrap justify-end gap-4 p-2  mb-2 ">
        <p className="my-auto">Your Score: {score || 0}</p>
        <NextButton setIsOpen={setIsOpen}>FINISH</NextButton>
      </div>
    </div> /////
  );
};

export default Finish;
