"use client";

import React, { useEffect, useRef, useState } from "react";


// A focused bottom drawer component. It can be controlled via `isOpen`/`onClose`
// props or used uncontrolled. It only renders the overlay + drawer area (no
// surrounding "main content"). Children are rendered inside the drawer.
export default function BottomDrawer({
  isOpen: propIsOpen,
  onClose,
  children,
  drawerHeight = 350,
}) {
  const [isOpen, setIsOpen] = useState(!!propIsOpen);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const threshold = 80;
  

  // Sync with controlled prop
  useEffect(() => {
    if (typeof propIsOpen === "boolean") setIsOpen(!!propIsOpen);
  }, [propIsOpen]);

  const close = () => {
    if (typeof onClose === "function") onClose();
    else setIsOpen(false);
  };

  const startDrag = (clientY) => {
    setDragStart(clientY);
    setIsDragging(true);
    draggingRef.current = true;
  };

  const moveDrag = (clientY) => {
    if (!draggingRef.current || dragStart === null) return;
    const diff = clientY - dragStart;
    if (isOpen) {
      setDragOffset(Math.max(0, diff));
    } else {
      const screenHeight = window.innerHeight || 0;
      if (dragStart > screenHeight - 120) {
        setDragOffset(Math.min(0, Math.max(-drawerHeight, diff)));
      }
    }
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    if (isOpen) {
      if (dragOffset > threshold) {
        close();
      }
    } else {
      if (Math.abs(dragOffset) > threshold) {
        setIsOpen(true);
        if (typeof onClose === "function" && propIsOpen === undefined) {
          // parent doesn't control open state, do nothing special
        }
      }
    }

    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
    draggingRef.current = false;
  };

  // Touch handlers
  const handleTouchStart = (e) => startDrag(e.touches[0].clientY);
  const handleTouchMove = (e) => moveDrag(e.touches[0].clientY);
  const handleTouchEnd = () => endDrag();

  // Mouse handlers (desktop)
  useEffect(() => {
    const move = (e) => moveDrag(e.clientY);
    const up = () => endDrag();
    if (isDragging) {
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, dragStart, dragOffset]);

  const handleMouseDown = (e) => startDrag(e.clientY);

  const getDrawerTransform = () => {
    if (isDragging) {
      if (isOpen) return `translateY(${dragOffset}px)`;
      return `translateY(calc(100% + ${dragOffset}px))`;
    }
    return isOpen ? "translateY(0)" : "translateY(100%)";
  };

  const getOverlayOpacity = () => {
    if (isDragging && !isOpen) return Math.abs(dragOffset) / drawerHeight;
    if (isDragging && isOpen) return Math.max(0, 1 - dragOffset / drawerHeight);
    return isOpen ? 1 : 0;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="h-full"
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 h-[100%]; ${isOpen || isDragging ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
           opacity: getOverlayOpacity() * 0.5,
          transition: isDragging ? "none" : "opacity 300ms",
        }}
        onClick={close}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-[#ffffff95] h-[100%] rounded-t-3xl border-t-2 border-t-red-500/50 overflow-hidden shadow-2xl z-50"
        style={{
          height: `${drawerHeight}px`,
          transform: getDrawerTransform(),
          transition: isDragging ? "none" : "transform 300ms",
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Handle area - larger and more visible */}
        <div
          className="flex justify-center items-center pt-3 pb-3 cursor-grab w-full relative z-[1000]"
          onMouseDown={handleMouseDown}
          onTouchStart={(e) => startDrag(e.touches[0].clientY)}
          aria-label="Drag drawer"
          role="button"
        >
          <div className="w-16 h-1.5 bg-red-500 rounded-full shadow-sm"></div>
        </div>

        {/* Content area: ensure pointer events are enabled so clicks inside do not close the drawer */}
        <div className="p-2 overflow-auto pointer-events-auto h-[100%]">{children}</div>
      </div>
    </div>
  );
}