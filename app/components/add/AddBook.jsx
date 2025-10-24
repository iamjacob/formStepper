import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import ProgressBars from "./ProgressBars.jsx";
import BookTypeButtons from "./BookTypeButtons.jsx";
// import Fireworks from "./Fireworks.jsx";
import ProgressCircle from "../add/ProgressCircle.jsx";

export default function AddBook() {
  const STEPS = 17;
  const TRANSITION_MS = 300;
  const SNAP_FRACTION = 0.18; // fraction of width to trigger a snap
  const EDGE_RESIST = 0.25; // edge pull resistance

  const [index, setIndex] = useState(0); // 0-based
  const [animating, setAnimating] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // live px
  const [inputMethod, setInputMethod] = useState("manual");

  const containerRef = useRef(null);
  const widthRef = useRef();
  const pointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const rafRef = useRef(null);
  const lastXRef = useRef(0);

  // const [inputMethod, setInputMethod] = useState("manual");
  const [depth, setDepth] = useState("Standard");
  const [showDepthPanel, setShowDepthPanel] = useState(false);

  const toggleInput = (method) => setInputMethod(method);

  useLayoutEffect(() => {
    const measure = () => {
      widthRef.current = containerRef.current
        ? containerRef.current.getBoundingClientRect().width
        : window.innerWidth;
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // step data as array (simpler than a switch)
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goNext();
    }
  };

  const steps = [
    // <div key="step-0">
    //   <h1 className="text-2xl font-bold mb-4">Add a new book</h1>
    // </div>,
    <div key="step-0">
      <BookTypeButtons/>
    </div>,
    ,
    <fieldset key="step-1">
      <legend>
        <label htmlFor="title">Titel</label>
      </legend>
      <input
        id="title"
        placeholder="Skriv bogens title"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    ,
    //here we need to add so on clicking book type it goes to next step

    <div key="step-2" className="input-method">
      <div className="method-toggle flex">
        <button
          className={`method-btn flex ${
            inputMethod === "manual" ? "active" : ""
          }`}
          onClick={() => toggleInput("manual")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-layers2-icon lucide-layers-2"
          >
            <path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
            <path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
          </svg>
          ~2m
        </button>
        <button
          className={`method-btn flex ${
            inputMethod === "scan" ? "active" : ""
          }`}
          onClick={() => toggleInput("scan")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-layers-icon lucide-layers"
          >
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
          </svg>
          2m+
        </button>
      </div>
    </div>,
    <fieldset key="step-3">
      <legend>
        <label htmlFor="title">Titel</label>
      </legend>
      <input
        id="title"
        placeholder="Skriv bogens title"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    <fieldset key="step-4">
      <legend>
        <label htmlFor="undertitle">Undertitel</label>
      </legend>
      <input
        id="undertitle"
        placeholder="Skriv bogens undertitle"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    <fieldset key="step-5">
      <legend>
        <label htmlFor="forside">Forside</label>
      </legend>
      <input
        id="forside"
        placeholder="URL til billede af forside"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    <fieldset key="step-6">
      <legend>
        <label htmlFor="side">Side</label>
      </legend>
      <input
        id="side"
        placeholder="URL til billede af siden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    <fieldset key="step-8">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-9">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-10">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-11">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-12">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-13">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-14">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-15">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-16">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    
    <fieldset key="step-17">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>,
    <fieldset key="step-18">
      <legend>
        <label htmlFor="bagside">Bagside</label>
      </legend>
      <input
        id="bagside"
        placeholder="URL til billede bagsiden"
        onKeyDown={handleEnterKey}
      />
    </fieldset>
    // <div>{index == 5 && <Fireworks />}</div>
  ];

  const subOptions = [, , <h1>yoyo</h1>];
  const subSteps = [, , <h1>yoyo</h1>];

  // unified pointer handlers (works for mouse & touch)
  useEffect(() => {
    const onMove = (e) => {
      if (!pointerDownRef.current || animating) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const dx = clientX - startXRef.current;
      // edge resistance
      let adjusted = dx;
      if ((index === 0 && dx > 0) || (index === STEPS - 1 && dx < 0))
        adjusted = dx * EDGE_RESIST;
      lastXRef.current = clientX;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setDragOffset(adjusted);
          rafRef.current = null;
        });
      }
      e.preventDefault?.();
    };

    const onUp = () => {
      if (!pointerDownRef.current) return;
      pointerDownRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      const w = widthRef.current || window.innerWidth;
      const dx = lastXRef.current - startXRef.current;
      const threshold = Math.max(40, w * SNAP_FRACTION);

      if (Math.abs(dx) >= threshold) {
        if (dx < 0 && index < STEPS - 1) {
          // next
          setAnimating(true);
          setDragOffset(-w);
          setTimeout(() => {
            setIndex((i) => Math.min(STEPS - 1, i + 1));
            setAnimating(false);
            setDragOffset(0);
          }, TRANSITION_MS);
        } else if (dx > 0 && index > 0) {
          // back
          setAnimating(true);
          setDragOffset(w);
          setTimeout(() => {
            setIndex((i) => Math.max(0, i - 1));
            setAnimating(false);
            setDragOffset(0);
          }, TRANSITION_MS);
        } else {
          // snap back
          setAnimating(true);
          setDragOffset(0);
          setTimeout(() => setAnimating(false), TRANSITION_MS);
        }
      } else {
        // not far enough -> snap back
        setAnimating(true);
        setDragOffset(0);
        setTimeout(() => setAnimating(false), TRANSITION_MS);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
    };
  }, [index, animating]);

  const onPointerDown = (e) => {
    if (animating) return;
    pointerDownRef.current = true;
    startXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    lastXRef.current = startXRef.current;
  };

  // ...existing code...
  const goNext = () => {
    if (animating || index >= STEPS - 1) return;
    const w = widthRef.current || window.innerWidth;
    setAnimating(true);
    setDragOffset(-w);
    setTimeout(() => {
      setIndex((i) => Math.min(STEPS - 1, i + 1));
      setDragOffset(0);
      setAnimating(false);
    }, TRANSITION_MS);
  };
  const goBack = () => {
    if (animating || index <= 0) return;
    const w = widthRef.current || window.innerWidth;
    setAnimating(true);
    setDragOffset(w);
    setTimeout(() => {
      setIndex((i) => Math.max(0, i - 1));
      setDragOffset(0);
      setAnimating(false);
    }, TRANSITION_MS);
  };

  // add desktop-only keyboard nav: Enter = next, ArrowRight = next, ArrowLeft = back
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia
      ? window.matchMedia("(pointer: fine)").matches
      : !("ontouchstart" in window);
    if (!isDesktop) return;

    const onKeyDown = (e) => {
      if (animating) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "TEXTAREA" || (e.target && e.target.isContentEditable))
        return;

      if (e.key === "Enter") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goBack();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [animating, goNext, goBack]);
  // ...existing code...
  const w = widthRef.current || window.innerWidth;
  const base = -(index * w);
  const translate = base + dragOffset;
  const transition = animating
    ? `transform ${TRANSITION_MS}ms ease-out`
    : "none";

  return (
    <div className="add-form">
      <div className="step-indicator flex items-end gap-0.5 absolute top-4 right-4 z-[1000]">
        <div className="absolute">
          <ProgressCircle progress={index / STEPS} size={40} strokeWidth={2} />
        </div>
        <div className="flex">
          <div className="text-2xl font-black text-black tracking-tight leading-none">
            {index}
          </div>
          <div className="text-sm font-light text-gray-400 pb-0.5 leading-none">
            /{STEPS}
          </div>
        </div>
      </div>

      <div
        className="step-container"
        ref={containerRef}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
        style={{ overflow: "hidden", position: "relative" }}
      >
        <div
          className="steps-strip"
          style={{
            display: "flex",
            transform: `translateX(${translate}px)`,
            transition,
            willChange: "transform",
          }}
        >
          {steps.map((c, i) => (
            <div
              key={i}
              className="step-item"
              style={{
                flex: `0 0 ${100}%`,
                boxSizing: "border-box",
                minWidth: 0,
                padding: 12,
              }}
            >
              {c}
              {subOptions[i]}
            </div>
          ))}
        </div>
      </div>

      <ProgressBars
        step={index}
        onNext={goNext}
        onBack={goBack}
        onNavigate={(targetIndex) => {
          if (animating || targetIndex === index) return;
          const w = widthRef.current || window.innerWidth;
          setAnimating(true);
          setDragOffset(targetIndex > index ? -w : w);
          setTimeout(() => {
            setIndex(targetIndex);
            setDragOffset(0);
            setAnimating(false);
          }, TRANSITION_MS);
        }}
      />

      <footer>
        <button
          className="btn btn-secondary"
          onClick={goBack}
          disabled={index === 0 || animating}
        >
          ← Back
        </button>

        <div>
          <button
            className="btn"
            onClick={() => console.log("openAddSettings")}
          >
            settings
          </button>
          <button
            className="btn btn-primary"
            onClick={goNext}
            disabled={index === STEPS - 1 || animating}
          >
            Next →
          </button>
        </div>
      </footer>
    </div>
  );
}
