import { useState } from "react";
import CloseDialog from "../button/CloseDialog";
import Timer from "../Timer";

const Dialog = ({ isOpen, setIsOpen }) => {
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="bg-white rounded h-[65%] w-[50%] z-10 fixed drop-shadow-md">
      <Timer />
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
    </div>
  );
};

export default Dialog;
