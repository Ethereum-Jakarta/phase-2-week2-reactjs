import Dialog from "../dialog/Dialog";

import { useEffect, useState } from "react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);

  // get score from localStorage
  useEffect(() => {
    const score = localStorage.getItem("score");
    setScore(score);
  }, [score]);
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-4xl font-black uppercase text-black sm:text-5xl md:text-6xl">
        UJIAN WIBU
      </h1>

      <p className="mb-6 mt-4 max-w-3xl font-bold text-center text-lg  text-lime-700 md:text-xl">
        Your Score: {score || 0}
      </p>

      <button
        className="pointer-events-auto bg-lime-500 px-4 py-2 text-xl font-bold uppercase text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mulai{" "}
      </button>
      {isOpen && <Dialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Hero;
