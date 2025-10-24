import React, { useEffect, useState, useRef } from "react";
import "../drawer/drawer.css";

const ProgressBars = ({ step, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(0); // which steps-holder is expanded (0 = first)
  const frames = ["⠖", "⠴", "⠦", "⠲"];
  const [loader, setLoader] = useState(frames[0]);
  const progressHolderRef = useRef(null);
  
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
      console.log('no progressHolder ref');
      onNavigate(newStep);
      return;
    }

    const dir = newStep > step ? 1 : -1;

    // If content overflow -> use native scroll
    if (el.scrollWidth > el.clientWidth) {
      console.log('using scrollBy');
      el.scrollBy({ left: 20 * dir, behavior: 'smooth' });
    } else {
      console.log('using scrollBy');
      // Fallback: translate the whole holder smoothly
      offsetRef.current += 20 * dir;
      el.style.transform = `translateX(${offsetRef.current}px)`;
    }

    onNavigate(newStep);
  };


  return (
    <div className="drawer">
      <div
        className="progressHolder"
        ref={progressHolderRef}
        onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
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
          <div className="progression"></div>
          <ul className="steps-text">
            
            <li
              onClick={() => handleNavigate(0)}
              className={`${step === 0 ? "font-semibold" : ""} cursor-pointer`}
            >
               Title {/*<i className="size-[.8rem] font-sans">{loader}</i> */}
            </li>
            <li
              onClick={() => handleNavigate(1)}
              className={`${step === 1 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Author
            </li>
            <li
              onClick={() => handleNavigate(2)}
              className={`${step === 2 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Year
            </li>
            <li
              onClick={() => handleNavigate(3)}
              className={`${step === 3 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Language
            </li>
            <li
              onClick={() => handleNavigate(4)}
              className={`${step === 4 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(5)}
              className={`${step === 5 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>

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
        <div className="steps  -rotate-90 text-[.7rem] color-[#444]">
          <div className="progression"></div>
          <ul className="steps-text">

             {/* <p><i className="size-[.8rem]">{loader}</i> Front </p>*/}
             
            <li className="font-">COVER</li>
            <li
              onClick={() => handleNavigate(6)}
              className={`${step === 6 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Front
            </li>
            <li
              onClick={() => handleNavigate(7)}
              className={`${step === 7 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Spine
            </li>
            <li
              onClick={() => handleNavigate(8)}
              className={`${step === 8 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Year
            </li>
            <li
              onClick={() => handleNavigate(9)}
              className={`${step === 9 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Language
            </li>
            <li
              onClick={() => handleNavigate(10)}
              className={`${step === 10 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(11)}
              className={`${step === 11 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>
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

        <div className="steps  -rotate-90 text-[.7rem] color-[#444]">
          <div className="progression"></div>
         
           
          <ul className="steps-text">
            <li
              onClick={() => handleNavigate(12)}
              className={`${step === 12 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Genre
            </li>
            <li
              onClick={() => handleNavigate(13)}
              className={`${step === 13 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Subcategory
            </li>
            <li
              onClick={() => handleNavigate(14)}
              className={`${step === 14 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Tags
            </li>
            <li
              onClick={() => handleNavigate(15)}
              className={`${step === 15 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Rating
            </li>
            <li
              onClick={() => handleNavigate(16)}
              className={`${step === 4 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(17)}
              className={`${step === 17 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>

        {/* <div className="progressHolder" onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}> */}
        {/* <svg
          role="progressbar"
          viewBox="0 0 24 24"
          aria-valuenow="0.16666666666666666"
          aria-valuemin="0"
          aria-valuemax="1"
          class="shrink-0 text-fd-primary"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke-width="2"
            stroke="#ff000030"
            class="stroke-current/25"
          ></circle>
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke-width="2"
            stroke="red"
            stroke-dasharray="69.11503837897544"
            stroke-dashoffset="57.59586531581287"
            stroke-linecap="round"
            transform="rotate(-90 12 12)"
            class="transition-all"
          ></circle>
        </svg> */}
        <div className="steps  -rotate-90 text-[.7rem] color-[#444]">
          <div className="progression"></div>
          <ul className="steps-text">
             {/*<p>Rating</p> 
            <p>Quotes</p>
            <p>Notes</p> */}
            <li
              onClick={() => handleNavigate(0)}
              className={`${step === 0 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Title
            </li>
            <li
              onClick={() => handleNavigate(1)}
              className={`${step === 1 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Author
            </li>
            <li
              onClick={() => handleNavigate(2)}
              className={`${step === 2 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Year
            </li>
            <li
              onClick={() => handleNavigate(3)}
              className={`${step === 3 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Language
            </li>
            <li
              onClick={() => handleNavigate(4)}
              className={`${step === 4 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(5)}
              className={`${step === 5 ? "font-semibold text-black" : "text-gray-400"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>
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
        {/* 
    transform: rotate(-90deg);
    font-size: .7rem;
    color: #444 */}
        <div className="steps  -rotate-90 text-[.7rem] color-[#444]">
          <div className="progression"></div>
          <ul className="steps-text">
            <li
              onClick={() => handleNavigate(0)}
              className={`${step === 0 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Title
            </li>
            <li
              onClick={() => handleNavigate(1)}
              className={`${step === 1 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Author
            </li>
            <li
              onClick={() => handleNavigate(2)}
              className={`${step === 2 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Year
            </li>
            <li
              onClick={() => handleNavigate(3)}
              className={`${step === 3 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Language
            </li>
            <li
              onClick={() => handleNavigate(4)}
              className={`${step === 4 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(5)}
              className={`${step === 5 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>
{/* 
        <svg
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
        <div className="steps  -rotate-90 text-[.7rem] color-[#444]">
          <div className="progression"></div>
          <ul className="steps-text">
            <li
              onClick={() => handleNavigate(0)}
              className={`${step === 0 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Title
            </li>
            <li
              onClick={() => handleNavigate(1)}
              className={`${step === 1 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Author
            </li>
            <li
              onClick={() => handleNavigate(2)}
              className={`${step === 2 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Year
            </li>
            <li
              onClick={() => handleNavigate(3)}
              className={`${step === 3 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Language
            </li>
            <li
              onClick={() => handleNavigate(4)}
              className={`${step === 4 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(5)}
              className={`${step === 5 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>
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

        <div className="steps  -rotate-90 text-[.7rem] color-[#444]">
          <div className="progression"></div>
          <ul className="steps-text">
            <li
              onClick={() => handleNavigate(0)}
              className={`${step === 0 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Title
            </li>
            <li
              onClick={() => handleNavigate(1)}
              className={`${step === 1 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Author
            </li>
            <li
              onClick={() => handleNavigate(2)}
              className={`${step === 2 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Year
            </li>
            <li
              onClick={() => handleNavigate(3)}
              className={`${step === 3 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Language
            </li>
            <li
              onClick={() => handleNavigate(4)}
              className={`${step === 4 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(5)}
              className={`${step === 5 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>

        {/* <div className="progressHolder" onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}> */}
        {/* <svg
          role="progressbar"
          viewBox="0 0 24 24"
          aria-valuenow="0.16666666666666666"
          aria-valuemin="0"
          aria-valuemax="1"
          class="shrink-0 text-fd-primary"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke-width="2"
            stroke="#ff000030"
            class="stroke-current/25"
          ></circle>
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke-width="2"
            stroke="red"
            stroke-dasharray="69.11503837897544"
            stroke-dashoffset="57.59586531581287"
            stroke-linecap="round"
            transform="rotate(-90 12 12)"
            class="transition-all"
          ></circle>
        </svg> */}
        <div className="steps  -rotate-90 text-[.7rem] color-[#444]">
          <div className="progression"></div>
          <ul className="steps-text">
            <li
              onClick={() => handleNavigate(0)}
              className={`${step === 0 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Title
            </li>
            <li
              onClick={() => handleNavigate(1)}
              className={`${step === 1 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Author
            </li>
            <li
              onClick={() => handleNavigate(2)}
              className={`${step === 2 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Year
            </li>
            <li
              onClick={() => handleNavigate(3)}
              className={`${step === 3 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Language
            </li>
            <li
              onClick={() => handleNavigate(4)}
              className={`${step === 4 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Publication
            </li>
            <li
              onClick={() => handleNavigate(5)}
              className={`${step === 5 ? "font-semibold text-black" : "text-gray-900"} cursor-pointer`}
            >
              Format
            </li>
          </ul>
        </div>
      </div>
      {/*
          <div>Classification</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide shrink-0 transition-transform mx-0.5"
            style={{ cursor: "pointer", transform: openIndex === 2 ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        <div className={"steps-holder " + (openIndex === 2 ? "" : "collapsed")}>
          <div className="progression"></div>
          <div className="steps-text">
            <p>Genre</p>
            <p>Subcategory</p>
            <p>Tags</p>
            <p>Rating</p>
            <p>Quotes</p>
            <p>Notes</p>
          </div>
        </div>
      </div>
      

 {/* <div>Info</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide shrink-0 transition-transform mx-0.5"
            style={{ cursor: "pointer", transform: openIndex === 1 ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg> */}

      {/* <div className={"steps-holder " + (openIndex === 1 ? "" : "collapsed")}>
          <div className="progression"></div>
          <div className="steps-text">
            <p>Title</p>
            <p>Author</p>
            <p>Year</p>
            <p>Language</p>
            <p>Publication</p>
            <p>Format</p>
          </div>
        </div> */}
      {/* <div className="progressHolder" onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}>
          <svg
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
      {/* <div>Cover</div> */}
      {/*           
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide shrink-0 transition-transform mx-0.5"
            style={{ cursor: "pointer", transform: openIndex === 0 ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg> */}

      {/* <div className={"steps-holder " + (openIndex === 0 ? "" : "collapsed")}>
          <div className="progression"></div>
          <div className="steps-text">
            <p><i className="size-[.8rem]">{loader}</i> Front </p>
            <p>Spine</p>
            <p>Back</p>
            <p>Barcode/ISBN</p>
            <p>Dimensions</p>
          </div>
        </div> 
        </div>
        */}
    </div>
  );
};

export default ProgressBars;
