import React, { useEffect, useState, useRef } from "react";
import "../drawer/drawer.css";

const ProgressBars = ({ step, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(0); // which steps-holder is expanded (0 = first)
  const frames = ["⠖", "⠴", "⠦", "⠲"];
  const [loader, setLoader] = useState(frames[0]);
  const progressHolderRef = useRef(null);
  const offsetRef = useRef(0); // Add this line to define offsetRef

  // console.log("Rendering ProgressBars", { step });
  // Loader animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoader((prev) => frames[(frames.indexOf(prev) + 1) % frames.length]);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (newStep) => {
    //console.log('handleNavigate', { from: step, to: newStep });
    const el = progressHolderRef.current;
    if (!el) {
      console.log("no progressHolder ref");
      onNavigate(newStep);
      return;
    }

    const dir = newStep > step ? 1 : -1;

    // If content overflow -> use native scroll
    if (el.scrollWidth > el.clientWidth) {
      console.log("using scrollBy");
      el.scrollBy({ left: 20 * dir, behavior: "smooth" });
    } else {
      console.log("using scrollBy");
      // Fallback: translate the whole holder smoothly
      offsetRef.current += 20 * dir;
      el.style.transform = `translateX(${offsetRef.current}px)`;
    }

    onNavigate(newStep);
  };

  return (
      <div
        className="progressHolder"
        ref={progressHolderRef}
      >
        {/* <svg
          role="progressbar"
          viewBox="0 0 24 24"
          aria-valuenow="0.16666666666666666"
          aria-valuemin="0"
          aria-valuemax="1"
          className="shrink-0 text-fd-primary"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            strokeWidth="2"
            stroke="#ff000030"
            className="stroke-current/25"
          ></circle>
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            strokeWidth="2"
            stroke="red"
            strokeDasharray="69.11503837897544"
            strokeDashoffset="57.59586531581287"
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
            className="transition-all"
          ></circle>
        </svg> */}
        <div className="steps -rotate-90 text-[.7rem] color-[#444]">
            <ul className="steps-text">
               <li
                onClick={() => handleNavigate(0)}
                className={`${
                  step === 0 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Format
              </li>
              <li
                onClick={() => handleNavigate(1)}
                className={`${
                  step === 1 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Title {/*<i className="size-[.8rem] font-sans">{loader}</i> */}
              </li>
              <li
                onClick={() => handleNavigate(2)}
                className={`${
                  step === 2 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Author <div className="optional-badge">optional</div>
              </li>
              <li
                onClick={() => handleNavigate(3)}
                className={`${
                  step === 3 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Year
              </li>
              <li
                onClick={() => handleNavigate(4)}
                className={`${
                  step === 4 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Language
              </li>
              <li
                onClick={() => handleNavigate(4)}
                className={`${
                  step === 4 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Publication
              </li>
              <li
                onClick={() => handleNavigate(5)}
                className={`${
                  step === 5 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Format
              </li>

              <h1 className="font-">COVER</h1>
              <li
                onClick={() => handleNavigate(6)}
                className={`${
                  step === 6 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Front
              </li>
              <li
                onClick={() => handleNavigate(7)}
                className={`${
                  step === 7 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Spine
              </li>
              <li
                onClick={() => handleNavigate(8)}
                className={`${
                  step === 8 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Year
              </li>
              <li
                onClick={() => handleNavigate(9)}
                className={`${
                  step === 9 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Language
              </li>
              <li
                onClick={() => handleNavigate(10)}
                className={`${
                  step === 10 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Publication
              </li>
              {/* <li
                onClick={() => handleNavigate(11)}
                className={`${
                  step === 11 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Format
              </li> */}
              <li
                onClick={() => handleNavigate(12)}
                className={`${
                  step === 12 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Genre
              </li>
              <li
                onClick={() => handleNavigate(13)}
                className={`${
                  step === 13 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Subcategory
              </li>
              <li
                onClick={() => handleNavigate(14)}
                className={`${
                  step === 14 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Tags
              </li>
              <li
                onClick={() => handleNavigate(15)}
                className={`${
                  step === 15 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Rating
              </li>
              <li
                onClick={() => handleNavigate(16)}
                className={`${
                  step === 4 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Publication
              </li>
              <li
                onClick={() => handleNavigate(17)}
                className={`${
                  step === 17 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Format
              </li>
              <li
                onClick={() => handleNavigate(18)}
                className={`${
                  step === 18 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Title
              </li>
              <li
                onClick={() => handleNavigate(19)}
                className={`${
                  step === 19 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Author
              </li>
              <li
                onClick={() => handleNavigate(20)}
                className={`${
                  step === 20 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Year
              </li>
              <li
                onClick={() => handleNavigate(21)}
                className={`${
                  step === 21 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Language
              </li>
              <li
                onClick={() => handleNavigate(22)}
                className={`${
                  step === 22 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Publication
              </li>
              <li
                onClick={() => handleNavigate(23)}
                className={`${
                  step === 23 ? "font-semibold text-black" : "text-gray-400"
                } cursor-pointer`}
              >
                Format
              </li>
            </ul>
          </div>
        </div>
  );
};

export default ProgressBars;
