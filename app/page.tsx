'use client'
import { useState } from "react";
import BottomDrawer from "./components/drawer/Drawer.jsx";
import AddBook from "./components/add/AddBook.jsx";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <a onClick={() => setIsDrawerOpen(true)}>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cross-icon lucide-cross"><path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"/></svg>
      </a>

      {isDrawerOpen && (
        <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow flex space-between">
          <div className="p-4">Header Content</div>
        </header>
        )}

      <BottomDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>

        <AddBook/>

      </BottomDrawer> 
    </div>
  );
}
