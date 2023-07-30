import React from "react";

export function Footer({ handleSpeed, speed, handlePlay, playPause }) {
  return (
    <footer>
      <input
        type="range"
        min="0"
        max="800"
        defaultValue="0"
        onChange={handleSpeed}
      />
      <p className="sort-speed">
        Sorting Interval Speed: {speed === 1000 ? "1 s" : speed + " ms"}
      </p>
      <button className="sort" onClick={handlePlay}>
        {playPause ? "Stop Sorting" : "Sort"}
      </button>
    </footer>
  );
}
