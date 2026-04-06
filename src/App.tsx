/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [fakePointerPos, setFakePointerPos] = useState({ x: 0, y: 0 });
  const [showFakePointer, setShowFakePointer] = useState(false);
  const [isExitHighlighted, setIsExitHighlighted] = useState(false);
  const exitBtnRef = useRef<HTMLButtonElement>(null);

  const teeth = [
    { height: 120 },
    { height: 140 },
    { height: 100 },
    { height: 130 },
    { height: 110 },
    { height: 150 },
    { height: 120 },
    { height: 140 },
  ];

  const handleStartClick = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;

    setFakePointerPos({ x: startX, y: startY });
    setShowFakePointer(true);
    setIsCursorHidden(true);

    if (exitBtnRef.current) {
      const rect = exitBtnRef.current.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      // Delay a bit to show the initial position, then animate
      setTimeout(() => {
        setFakePointerPos({ x: targetX, y: targetY });
      }, 50);

      // When it reaches the exit button
      setTimeout(() => {
        setIsExitHighlighted(true);
        setTimeout(() => {
          window.location.href = "https://imgur.com/";
        }, 300);
      }, 1250);
    }
  };

  return (
    <div 
      className={`relative min-h-screen w-full overflow-hidden select-none ${isCursorHidden ? 'cursor-none' : 'cursor-default'}`}
    >
      {/* Background Image Container */}
      <div className="fixed inset-0 -z-10">
        <img 
          /* 
             NOTE FOR GITHUB/LOCAL DEPLOYMENT:
             If you want to use your own image, place it in the 'public' folder 
             and change the src to '/your-image-name.png'
          */
          src="https://picsum.photos/seed/creepy-toilet/1920/1080" 
          alt="horror background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Subtle Dark Overlay (Reduced to 30% to ensure image is visible) */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none z-0" />

      {/* Fake Pointer */}
      <AnimatePresence>
        {showFakePointer && (
          <motion.div
            initial={{ left: fakePointerPos.x, top: fakePointerPos.y }}
            animate={{ left: fakePointerPos.x, top: fakePointerPos.y }}
            transition={{ duration: 1.2, ease: [0.45, 0.05, 0.55, 0.95] }}
            className="fixed w-6 h-6 z-[10000] pointer-events-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" stroke="black" stroke-width="1" d="M7 2l12 11.2l-5.8 0.5l3.3 7.3l-2.2 1l-3.2-7.4L7 19z"/></svg>')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="fixed top-4 left-5 text-5xl font-bold z-10 tracking-tighter">
        aNOTHERmONIKER
      </div>

      {/* Teeth */}
      <div className="fixed top-0 w-full flex justify-around z-5 px-10">
        {teeth.map((tooth, i) => (
          <div
            key={i}
            className="w-16 bg-gradient-to-b from-[#400] to-[#eee] rounded-b-2xl shadow-lg"
            style={{ height: tooth.height }}
          />
        ))}
      </div>

      {/* Welcome Message */}
      <div className="relative z-10 mt-64 ml-12 text-2xl">
        welcome!!!!!!!!!_
      </div>

      {/* Dialog Box */}
      <div className="relative z-10 mx-auto mt-10 w-[90%] max-w-5xl border-4 border-[#ff0000] bg-black p-8">
        <div className="mb-12 text-xl text-[#cc0000] leading-relaxed">
          Oh, it's just you. Well, I'm glad you stopped by anyway. Make yourself at home, and stay as long as you like.
        </div>
        <button
          onClick={handleStartClick}
          className={`mx-auto block border-2 border-[#ff0000] bg-transparent px-10 py-3 text-xl font-bold text-[#ff0000] outline-none ${isCursorHidden ? 'cursor-none' : 'cursor-default'}`}
        >
          START
        </button>
      </div>

      {/* Exit Button */}
      <button
        ref={exitBtnRef}
        className={`fixed bottom-8 right-10 border border-[#ff0000] px-4 py-1 text-sm opacity-60 z-10 transition-colors duration-300 ${
          isExitHighlighted ? 'bg-white text-black opacity-100' : 'bg-black text-[#ff0000]'
        } ${isCursorHidden ? 'cursor-none' : 'cursor-default'}`}
      >
        EXIT
      </button>
    </div>
  );
}
